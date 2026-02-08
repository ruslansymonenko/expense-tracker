import { CategoryListItem } from "@/components/blocks/CategoryListItem";
import { CategoryModal } from "@/components/blocks/CategoryModal";
import { CategorySummaryCard } from "@/components/blocks/CategorySummaryCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Colors } from "@/constants/colors";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { useExpenses } from "@/hooks/useExpenses";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/api/categories";
import { Category } from "@/types/category";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: expenses, isLoading: expensesLoading } = useExpenses();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const isLoading = categoriesLoading || expensesLoading;

  const getCategoryTotal = useCallback(
    (categoryId: string) => {
      return (
        expenses
          ?.filter((expense) => expense.categoryId === categoryId)
          .reduce((sum, expense) => sum + expense.amount, 0) ?? 0
      );
    },
    [expenses],
  );

  const getCategoryCount = useCallback(
    (categoryId: string) => {
      return (
        expenses?.filter((expense) => expense.categoryId === categoryId)
          .length ?? 0
      );
    },
    [expenses],
  );

  const handleAddCategory = useCallback(() => {
    setEditingCategory(null);
    setModalVisible(true);
  }, []);

  const handleEditCategory = useCallback((category: Category) => {
    setEditingCategory(category);
    setModalVisible(true);
  }, []);

  const handleDeleteCategory = useCallback(
    (category: Category) => {
      const count = getCategoryCount(category.id);

      if (count > 0) {
        Alert.alert(
          "Cannot Delete Category",
          `This category has ${count} transaction${count === 1 ? "" : "s"}. Please reassign or delete those transactions first.`,
          [{ text: "OK" }],
        );
        return;
      }

      Alert.alert(
        "Delete Category",
        `Are you sure you want to delete "${category.name}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              deleteCategory.mutate(category.id);
            },
          },
        ],
      );
    },
    [getCategoryCount, deleteCategory],
  );

  const handleSubmitCategory = useCallback(
    (data: CreateCategoryRequest | UpdateCategoryRequest) => {
      if (editingCategory) {
        updateCategory.mutate(
          { id: editingCategory.id, data },
          {
            onSuccess: () => {
              setModalVisible(false);
              setEditingCategory(null);
            },
          },
        );
      } else {
        createCategory.mutate(data as CreateCategoryRequest, {
          onSuccess: () => {
            setModalVisible(false);
          },
        });
      }
    },
    [editingCategory, updateCategory, createCategory],
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setEditingCategory(null);
  }, []);

  const totalExpenses = useMemo(
    () => expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0,
    [expenses],
  );

  // eslint-disable-next-line react/display-name
  const renderCategoryItem = useCallback(
    ({ item }: { item: Category }) => {
      const total = getCategoryTotal(item.id);
      const count = getCategoryCount(item.id);
      const isSelected = selectedCategory === item.id;

      return (
        <CategoryListItem
          category={item}
          total={total}
          count={count}
          isSelected={isSelected}
          totalExpenses={totalExpenses}
          onPress={() => setSelectedCategory(isSelected ? null : item.id)}
          onLongPress={() => handleEditCategory(item)}
          onEdit={() => handleEditCategory(item)}
          onDelete={() => handleDeleteCategory(item)}
        />
      );
    },
    [
      selectedCategory,
      getCategoryTotal,
      getCategoryCount,
      totalExpenses,
      handleEditCategory,
      handleDeleteCategory,
    ],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <PageHeader title="Categories" />
        <LoadingState message="Loading categories..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title="Categories"
        rightComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCategory}
          >
            <Ionicons name="add-circle" size={28} color={Colors.primary} />
          </TouchableOpacity>
        }
      />

      <CategorySummaryCard
        totalCategories={categories?.length ?? 0}
        totalExpenses={totalExpenses}
      />

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={8}
        windowSize={8}
        initialNumToRender={8}
      />

      <CategoryModal
        visible={modalVisible}
        editingCategory={editingCategory}
        isLoading={createCategory.isPending || updateCategory.isPending}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCategory}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addButton: {
    padding: 4,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
});
