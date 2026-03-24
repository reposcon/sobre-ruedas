import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './environment';
@Injectable({ providedIn: 'root' })
export class ProductService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: { persistSession: false } 
    });
  }

  async getProducts() {
    const { data, error } = await this.supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    return data;
  }
}