import { Category } from "../../types/category";
import { apiClient } from "./client";

export interface CategoriesResponse {
  data: Category[];
}

export interface CategoryResponse {
  data: Category;
}

export interface CreateCategoryRequest {
  name: string;
  icon: string;
  color: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  icon?: string;
  color?: string;
}

export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    const response = await apiClient.get<CategoriesResponse>("/categories");
    return response.data.data;
  },

  async getById(id: string): Promise<Category> {
    const response = await apiClient.get<CategoryResponse>(`/categories/${id}`);
    return response.data.data;
  },

  async create(data: CreateCategoryRequest): Promise<Category> {
    const response = await apiClient.post<CategoryResponse>(
      "/categories",
      data,
    );
    return response.data.data;
  },

  async update(id: string, data: UpdateCategoryRequest): Promise<Category> {
    const response = await apiClient.put<CategoryResponse>(
      `/categories/${id}`,
      data,
    );
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/categories/${id}`);
  },
};
