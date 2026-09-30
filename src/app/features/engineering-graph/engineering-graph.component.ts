import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { WorkspacePreferencesService } from '../../core/services/workspace-preferences.service';
import { graphDomains, graphNodeById, graphNodes } from '../../core/data/graph.data';
import { capabilityCommands, commerceCapability } from '../../core/data/services.data';
import { caseStudyProjects, projectById } from '../../core/data/projects.data';

interface Edge {
  id: string;
  capabilityId: string;
  projectId: string;
  d: string;
  lead: boolean;
}

type Selection =
  | { kind: 'none' }
  | { kind: 'capability'; id: string }
  | { kind: 'project'; id: string }
  | { kind: 'command'; id: string };

/**
 * The engineering graph: capabilities on the left, project evidence on the
 * right, connected by the relationships already declared in the skill data.
 *
 * Positions are laid out by CSS and *measured*, not simulated - there is no
 * physics, nothing floats, and the topology is identical on every load. The
 * SVG only draws curves between two boxes the browser already positioned.
 */
@Component({
  selector: 'app-engineering-graph',
  standalone: true,
  templateUrl: './engineering-graph.component.html',
  styleUrl: './engineering-graph.component.scss',
})
export class EngineeringGraphComponent implements AfterViewInit, OnDestroy {
  readonly workspace = inject(WorkspacePreferencesService);
  readonly ui = this.workspace.ui;

  readonly domains = graphDomains;
  readonly nodes = graphNodes;
  readonly commands = capabilityCommands;
  readonly commerce = commerceCapability;
  /** Only projects that carry evidence appear as graph endpoints. */
  readonly evidence = caseStudyProjects;

  readonly selection = signal<Selection>({ kind: 'none' });
  readonly edges = signal<Edge[]>([]);
  readonly size = signal({ width: 1000, height: 620 });

  /** Capability ids currently highlighted. */
  readonly activeCapabilities = computed<Set<string>>(() => {
    const selection = this.selection();
    switch (selection.kind) {
      case 'capability':
        return new Set([selection.id]);
      case 'project':
        return new Set(
          this.nodes.filter((node) => node.projectIds.includes(selection.id)).map((n) => n.id),
        );
      case 'command': {
        const command = this.commands.find((item) => item.id === selection.id);
        if (!command) return new Set();
        return new Set(
          this.nodes
            .filter((node) => node.projectIds.some((id) => command.projectIds.includes(id)))
            .map((node) => node.id),
        );
      }
      default:
        return new Set();
    }
  });

  /** Project ids currently highlighted. */
  readonly activeProjects = computed<Set<string>>(() => {
    const selection = this.selection();
    switch (selection.kind) {
      case 'capability':
        return new Set(graphNodeById(selection.id)?.projectIds ?? []);
      case 'project':
        return new Set([selection.id]);
      case 'command':
        return new Set(this.commands.find((item) => item.id === selection.id)?.projectIds ?? []);
      default:
        return new Set();
    }
  });

  /** The one-line context that replaces a paragraph of explanation. */
  readonly context = computed(() => {
    const selection = this.selection();

    if (selection.kind === 'capability') {
      const node = graphNodeById(selection.id);
      if (!node) return null;
      return {
        title: node.name,
        line: this.workspace.t(node.note),
        label: this.workspace.t(this.ui.graph.usedIn),
        items: node.projectIds
          .map((id) => projectById(id))
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
          .map((p) => this.workspace.t(p.name)),
      };
    }

    if (selection.kind === 'project') {
      const project = projectById(selection.id);
      if (!project) return null;
      return {
        title: this.workspace.t(project.name),
        line: this.workspace.t(project.descriptor),
        label: this.workspace.t(this.ui.graph.builtWith),
        items: this.nodes
          .filter((node) => node.projectIds.includes(selection.id))
          .map((node) => node.name),
      };
    }

    if (selection.kind === 'command') {
      const command = this.commands.find((item) => item.id === selection.id);
      if (!command) return null;
      return {
        title: this.workspace.t(command.label),
        line: this.workspace.t(command.line),
        label: this.workspace.t(this.ui.graph.usedIn),
        items: command.projectIds
          .map((id) => projectById(id))
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
          .map((p) => this.workspace.t(p.name)),
      };
    }

    return null;
  });

  /** Mobile lanes: capabilities grouped by domain for the selected project. */
  readonly lanes = computed(() => {
    const active = this.activeCapabilities();
    const filtered = active.size > 0;
    return this.domains
      .map((domain) => ({
        id: domain.id,
        label: this.workspace.t(domain.label),
        nodes: this.nodes.filter(
          (node) => node.domainId === domain.id && (!filtered || active.has(node.id)),
        ),
      }))
      .filter((lane) => lane.nodes.length > 0);
  });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private resizeObserver?: ResizeObserver;
  private frame = 0;

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.schedule();
    this.resizeObserver = new ResizeObserver(() => this.schedule());
    const surface = this.elementRef.nativeElement.querySelector('.graph-surface');
    if (surface) {
      this.resizeObserver.observe(surface);
    }

    void this.motion.sectionReveal(this.elementRef.nativeElement);
    void this.motion.graphEntrance(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) {
      return;
    }
    this.resizeObserver?.disconnect();
    cancelAnimationFrame(this.frame);
  }

  /* -------------------------------------------------------------- selection */

  selectCapability(id: string): void {
    this.apply(this.isSelected('capability', id) ? { kind: 'none' } : { kind: 'capability', id });
  }

  selectProject(id: string): void {
    this.apply(this.isSelected('project', id) ? { kind: 'none' } : { kind: 'project', id });
  }

  selectCommand(id: string): void {
    this.apply(this.isSelected('command', id) ? { kind: 'none' } : { kind: 'command', id });
  }

  reset(): void {
    this.apply({ kind: 'none' });
  }

  isSelected(kind: Selection['kind'], id: string): boolean {
    const selection = this.selection();
    return selection.kind !== 'none' && selection.kind === kind && selection.id === id;
  }

  isEdgeActive(edge: Edge): boolean {
    return this.activeCapabilities().has(edge.capabilityId) &&
      this.activeProjects().has(edge.projectId);
  }

  projectName(id: string): string {
    const project = projectById(id);
    return project ? this.workspace.t(project.name) : id;
  }

  private apply(selection: Selection): void {
    this.selection.set(selection);
    void this.motion.graphPulse(this.elementRef.nativeElement);
  }

  /* ------------------------------------------------------------- geometry - */

  private schedule(): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.measure());
  }

  /**
   * Reads each node's box once and derives every edge from it. This runs on
   * resize only - never during an animation frame loop.
   */
  private measure(): void {
    const host = this.elementRef.nativeElement;
    const surface = host.querySelector<HTMLElement>('.graph-surface');
    if (!surface) {
      return;
    }

    const base = surface.getBoundingClientRect();
    this.size.set({ width: base.width, height: base.height });

    const point = (selector: string) => {
      const element = surface.querySelector<HTMLElement>(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        // Edges leave a capability from its inline-end and arrive at a project
        // on its inline-start; mirrored automatically in RTL.
        out: {
          x: (this.workspace.isArabic() ? rect.left : rect.right) - base.left,
          y: rect.top + rect.height / 2 - base.top,
        },
        in: {
          x: (this.workspace.isArabic() ? rect.right : rect.left) - base.left,
          y: rect.top + rect.height / 2 - base.top,
        },
      };
    };

    const leadCapabilities = new Set(['angular', 'nx', 'ionic']);
    const next: Edge[] = [];

    for (const node of this.nodes) {
      const from = point(`[data-cap="${node.id}"]`);
      if (!from) continue;

      for (const projectId of node.projectIds) {
        const to = point(`[data-evidence="${projectId}"]`);
        if (!to) continue;

        const dx = (to.in.x - from.out.x) * 0.5;
        next.push({
          id: `${node.id}~${projectId}`,
          capabilityId: node.id,
          projectId,
          d: `M ${from.out.x} ${from.out.y} C ${from.out.x + dx} ${from.out.y}, ${to.in.x - dx} ${to.in.y}, ${to.in.x} ${to.in.y}`,
          lead: leadCapabilities.has(node.id),
        });
      }
    }

    this.edges.set(next);
  }
}
