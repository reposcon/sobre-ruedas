import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedProduct: any = null;
  userProfile: string | null = null;
  selectedCategory: string = 'TODOS';
  searchQuery: string = '';

  constructor(private productService: ProductService) { }

  async ngOnInit() {
    const saved = localStorage.getItem('user_profile');
    if (saved) { this.loadDashboard(saved); }
  }

  async selectProfile(profile: string) {
    this.userProfile = profile;
    localStorage.setItem('user_profile', profile);
    await this.loadDashboard(profile);
  }

  async loadDashboard(profile: string) {
    const data = await this.productService.getProductsByProfile(profile);
    this.allProducts = data;
    this.filteredProducts = [...this.allProducts];
    const uniqueCats = new Set(this.allProducts.map(p => p.category).filter(c => c));
    this.categories = ['TODOS', ...Array.from(uniqueCats).sort()];
  }

  resetProfile() {
    localStorage.removeItem('user_profile');
    this.userProfile = null;
    this.allProducts = [];
  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter(p => {
      const matchesCat = this.selectedCategory === 'TODOS' || p.category === this.selectedCategory;
      const matchesSearch = p.product_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }

  openModal(product: any) { this.selectedProduct = product; }
  closeModal() { this.selectedProduct = null; }
  setCategory(cat: string) { this.selectedCategory = cat; this.applyFilters(); }
}