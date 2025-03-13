import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageModule } from "primeng/image";
import { ScreenService } from '../../services/screen.service';
@Component({
  selector: 'projects',
  imports: [MatGridListModule, CommonModule, ImageModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  tiles = [
    {
      title: 'Tower Load Inventory',
      description: 'A Syriatel project designed to manage loads on towers, including space allocation and weight distribution. It ensures efficient resource utilization and structural safety.',
      img: 'syriatel.webp',
      category: 'ERP',
    },
    {
      title: 'WF SYSTEM',
      description: 'A dynamic task and request automation system built as a flexible layer to integrate with any existing systems. It features customizable management and configuration options.',
      img: 'wf-logo.webp',
      category: 'ERP',
    },
    {
      title: 'UN Employee Management',
      description: 'A system developed for the United Nations to manage employee contracts, calculate salaries, and streamline HR processes.',
      img: 'un-logo.webp',
      category: 'ERP',
    },
    // {
    //   title: 'Restaurant Management HalaFalafel',
    //   description: 'A comprehensive management system for HalaFalafel restaurants, handling product pricing, sales tracking, warehouse inventory, customer relations, and employee management.',
    //   img: 'halafalafel.webp',
    //   category: 'Freelance',
    // },
    {
      title: 'Phone Parts 2GO',
      description: 'An advanced B2B e-commerce platform built on Shopify, specifically designed for the German market. This system facilitates the sale of mobile phone parts, offering features such as product catalog management, bulk pricing, order tracking, and customer relationship management to enhance the buying experience for businesses.',
      img: '2go.svg',
      category: 'Freelance',
    },
    {
      title: 'Tender Management System (Tms)',
      description: 'A centralized platform designed to streamline the entire tender management process, from tender creation and publication to bid submission, evaluation, and award. It ensures transparency, efficiency, and compliance with organizational and regulatory standards.',
      img: 'tms.webp',
      category: 'ERP',
    }
  ];
  constructor(public scrnSrv: ScreenService) { }
}
