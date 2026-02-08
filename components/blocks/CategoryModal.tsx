import { CategoryForm } from "@/components/forms/CategoryForm";
import { Colors } from "@/constants/colors";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/api/categories";
import { Category } from "@/types/category";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryModalProps {
  readonly visible: boolean;
  readonly editingCategory: Category | null;
  readonly isLoading: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (
    data: CreateCategoryRequest | UpdateCategoryRequest,
  ) => void;
}

export function CategoryModal({
  visible,
  editingCategory,
  isLoading,
  onClose,
  onSubmit,
}: Readonly<CategoryModalProps>) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {editingCategory ? "Edit Category" : "Add Category"}
          </Text>
          <View style={{ width: 28 }} />
        </View>
        <CategoryForm
          initialData={editingCategory || undefined}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitLabel={editingCategory ? "Update Category" : "Create Category"}
        />
      </SafeAreaView>
    </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
  },
});
