import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryForm } from "../../components/forms/CategoryForm";
import { Card } from "../../components/ui/Card";
import { Colors } from "../../constants/colors";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/useCategories";
import { useExpenses } from "../../hooks/useExpenses";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../../lib/api/categories";
import { Category } from "../../types/category";

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

  const getCategoryTotal = (categoryId: string) => {
    return (
      expenses
        ?.filter((expense) => expense.categoryId === categoryId)
        .reduce((sum, expense) => sum + expense.amount, 0) ?? 0
    );
  };

  const getCategoryCount = (categoryId: string) => {
    return (
      expenses?.filter((expense) => expense.categoryId === categoryId).length ??
      0
    );
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setModalVisible(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const handleDeleteCategory = (category: Category) => {
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
  };

  const handleSubmitCategory = (
    data: CreateCategoryRequest | UpdateCategoryRequest,
  ) => {
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
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const total = getCategoryTotal(item.id);
    const count = getCategoryCount(item.id);
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        onPress={() => setSelectedCategory(isSelected ? null : item.id)}
        onLongPress={() => handleEditCategory(item)}
        activeOpacity={0.7}
      >
        <Card
          style={StyleSheet.flatten([
            styles.categoryCard,
            isSelected && styles.categoryCardSelected,
          ])}
        >
          <View style={styles.categoryHeader}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color + "20" },
              ]}
            >
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryCount}>
                {count} transaction{count === 1 ? "" : "s"}
              </Text>
            </View>
            <View style={styles.categoryActions}>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleEditCategory(item)}
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionIcon}
                onPress={() => handleDeleteCategory(item)}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.categoryFooter}>
            <Text style={[styles.categoryAmount, { color: item.color }]}>
              ${total.toFixed(2)}
            </Text>
            {total > 0 && totalExpenses > 0 && (
              <View
                style={[
                  styles.percentageBadge,
                  { backgroundColor: item.color + "20" },
                ]}
              >
                <Text style={[styles.percentageText, { color: item.color }]}>
                  {((total / totalExpenses) * 100).toFixed(1)}%
                </Text>
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const totalExpenses =
    expenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Categories</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Ionicons name="add-circle" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Ionicons name="apps" size={24} color={Colors.primary} />
            <Text style={styles.summaryLabel}>Categories</Text>
            <Text style={styles.summaryValue}>{categories?.length ?? 0}</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Ionicons name="cash" size={24} color={Colors.success} />
            <Text style={styles.summaryLabel}>Total Spent</Text>
            <Text style={[styles.summaryValue, { color: Colors.success }]}>
              ${totalExpenses.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Ionicons name="close" size={28} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {editingCategory ? "Edit Category" : "Add Category"}
            </Text>
            <View style={{ width: 28 }} />
          </View>
          <CategoryForm
            initialData={editingCategory || undefined}
            onSubmit={handleSubmitCategory}
            isLoading={createCategory.isPending || updateCategory.isPending}
            submitLabel={
              editingCategory ? "Update Category" : "Create Category"
            }
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
  addButton: {
    padding: 4,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  categoryCard: {
    marginBottom: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + "05",
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionIcon: {
    padding: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  categoryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
});
