import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Colors } from "@/constants/colors";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "@/lib/api/categories";
import { Category } from "@/types/category";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryFormProps {
  readonly initialData?: Category;
  readonly onSubmit: (
    data: CreateCategoryRequest | UpdateCategoryRequest,
  ) => void;
  readonly isLoading?: boolean;
  readonly submitLabel?: string;
}

const CATEGORY_ICONS = [
  "fast-food-outline",
  "restaurant-outline",
  "car-outline",
  "bus-outline",
  "cart-outline",
  "bag-outline",
  "game-controller-outline",
  "film-outline",
  "musical-notes-outline",
  "receipt-outline",
  "flash-outline",
  "water-outline",
  "medkit-outline",
  "fitness-outline",
  "school-outline",
  "book-outline",
  "home-outline",
  "shirt-outline",
  "phone-portrait-outline",
  "gift-outline",
  "airplane-outline",
  "bed-outline",
  "briefcase-outline",
  "cash-outline",
];

const CATEGORY_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B739",
  "#52B788",
  "#E63946",
  "#F77F00",
  "#06AED5",
  "#6A4C93",
  "#FF9F1C",
  "#2A9D8F",
];

export function CategoryForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Save Category",
}: Readonly<CategoryFormProps>) {
  const [name, setName] = useState(initialData?.name || "");
  const [icon, setIcon] = useState(initialData?.icon || CATEGORY_ICONS[0]);
  const [color, setColor] = useState(initialData?.color || CATEGORY_COLORS[0]);

  const [errors, setErrors] = useState<{
    name?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const data: CreateCategoryRequest | UpdateCategoryRequest = {
      name: name.trim(),
      icon,
      color,
    };

    onSubmit(data);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category Name</Text>
          <Input
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="Enter category name"
            error={errors.name}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Icon</Text>
          <View style={styles.iconsGrid}>
            {CATEGORY_ICONS.map((iconName) => {
              const isSelected = icon === iconName;
              return (
                <TouchableOpacity
                  key={iconName}
                  style={[
                    styles.iconItem,
                    isSelected && {
                      backgroundColor: color + "20",
                      borderColor: color,
                    },
                  ]}
                  onPress={() => setIcon(iconName)}
                >
                  <Ionicons
                    name={iconName as any}
                    size={28}
                    color={isSelected ? color : Colors.textSecondary}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorsGrid}>
            {CATEGORY_COLORS.map((colorValue) => {
              const isSelected = color === colorValue;
              return (
                <TouchableOpacity
                  key={colorValue}
                  style={[
                    styles.colorItem,
                    { backgroundColor: colorValue },
                    isSelected && styles.colorItemSelected,
                  ]}
                  onPress={() => setColor(colorValue)}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={20} color="#FFF" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.previewContainer}>
          <Text style={styles.label}>Preview</Text>
          <View style={styles.previewCard}>
            <View
              style={[styles.previewIcon, { backgroundColor: color + "20" }]}
            >
              <Ionicons name={icon as any} size={32} color={color} />
            </View>
            <Text style={styles.previewName}>{name || "Category Name"}</Text>
          </View>
        </View>

        <Button
          title={submitLabel}
          onPress={handleSubmit}
          disabled={isLoading}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  iconItem: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  colorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  colorItemSelected: {
    borderWidth: 3,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  previewContainer: {
    marginTop: 8,
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    gap: 12,
  },
  previewIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  previewName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  submitButton: {
    marginTop: 12,
  },
});
