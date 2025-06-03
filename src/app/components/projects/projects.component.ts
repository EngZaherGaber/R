import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ImageModule } from "primeng/image";
import { GalleriaModule } from "primeng/galleria";
import { ScreenService } from '../../services/screen.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'projects',
  imports: [MatGridListModule, CommonModule, ImageModule, GalleriaModule, ButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  tiles = [
    {
      title: 'Tower Load Inventory (Finshed)',
      description: 'A Syriatel project designed to manage loads on towers, including space allocation and weight distribution. It ensures efficient resource utilization and structural safety.',
      img: 'syriatel.webp',
      category: 'ERP',
      images: [
        'TLI/Home.PNG',
        'TLI/Login.PNG',
        'TLI/site-editor.png',
        'TLI/Tree.PNG',
        'TLI/UserGraph.PNG',
      ]
    },
    {
      title: 'WF SYSTEM (Finshed)',
      description: 'A dynamic task and request automation system built as a flexible layer to integrate with any existing systems. It features customizable management and configuration options.',
      img: 'wf-logo.webp',
      category: 'ERP',
      images: [
        'WF/Action.PNG',
        'WF/GraphTemplate.PNG',
        'WF/Holiday.png',
        'WF/Request.PNG',
      ]
    },
    {
      title: 'UNDP Employee Management (Finshed)',
      description: 'A system developed for the United Nations to manage employee contracts, calculate salaries, and streamline HR processes.',
      img: 'un-logo.webp',
      category: 'ERP',
      images: [
        'UN/Login.PNG',
        'UN/Employee.PNG',
        'UN/Land.PNG',
      ]
    },
    // {
    //   title: 'Restaurant Management HalaFalafel',
    //   description: 'A comprehensive management system for HalaFalafel restaurants, handling product pricing, sales tracking, warehouse inventory, customer relations, and employee management.',
    //   img: 'halafalafel.webp',
    //   category: 'Freelance',
    // },
    {
      title: 'Phone Parts 2GO (In Development)',
      description: 'An advanced B2B e-commerce platform built on Shopify, specifically designed for the German market. This system facilitates the sale of mobile phone parts, offering features such as product catalog management, bulk pricing, order tracking, and customer relationship management to enhance the buying experience for businesses.',
      img: '2go.svg',
      category: 'Freelance',
      url: 'https://phoneparts2go.com/'
    },
    {
      title: 'Hulle 2GO (In Development)',
      description: 'An advanced B2C e-commerce platform built on Shopify, specifically designed for the German market. This system facilitates the sale of mobile phone parts, offering features such as product catalog management, bulk pricing, order tracking, and customer relationship management to enhance the buying experience for businesses.',
      img: 'Handy.webp',
      category: 'Freelance',
      url: 'https://huelle2go.de'
    },
    {
      title: 'ReiseKoffer 2GO (In Development)',
      description: 'An advanced B2C e-commerce platform built on Shopify, specifically designed for the German market. This system facilitates the sale of SuitCases, offering features such as product catalog management, bulk pricing, order tracking, and customer relationship management to enhance the buying experience for businesses.',
      img: 'ReiseKoffer.webp',
      category: 'Freelance',
      url: 'https://huelle2go.de/password'
    },
    {
      title: 'Tender Management System (Tms)',
      description: 'A centralized platform designed to streamline the entire tender management process, from tender creation and publication to bid submission, evaluation, and award. It ensures transparency, efficiency, and compliance with organizational and regulatory standards.',
      img: 'tms.webp',
      category: 'ERP',
    }
  ];
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  display: boolean = false;
  images = model([]);
  selectedItem: any;
  constructor(public scrnSrv: ScreenService) { }
  selecteItem(selectedItem: any) {
    console.log('hi')
    this.display = true;
    this.selectedItem = selectedItem;
  }
}
