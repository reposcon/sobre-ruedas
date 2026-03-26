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
  async getProductsByProfile(profile: string) {
    // Ahora usamos 'product_plans' con S
    const { data, error } = await this.supabase
      .from('products')
      .select(`
      *,
      product_plans!inner (*)
    `)
      .eq('product_plans.profile_type', profile);

    if (error) {
      console.error('Error en Supabase:', error);
      return [];
    }
    return data;
  }
}