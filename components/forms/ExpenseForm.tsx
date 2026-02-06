import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useCategories } from "../../hooks/useCategories";
import {
  CreateExpenseRequest,
  UpdateExpenseRequest,
} from "../../lib/api/expenses";
import { formatDateForMySQL } from "../../lib/utils/dateFormat";
import { Expense } from "../../types/expense";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface ExpenseFormProps {
  readonly initialData?: Expense;
  readonly onSubmit: (
    data: CreateExpenseRequest | UpdateExpenseRequest,
  ) => void;
  readonly isLoading?: boolean;
  readonly submitLabel?: string;
}

export function ExpenseForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = "Save Expense",
}: Readonly<ExpenseFormProps>) {
  const getInitialDate = () => {
    if (!initialData?.date) return new Date();
    return initialData.date instanceof Date
      ? initialData.date
      : new Date(initialData.date);
  };

  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState(
    initialData?.amount ? initialData.amount.toString() : "",
  );
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [date, setDate] = useState(getInitialDate());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const [errors, setErrors] = useState<{
    title?: string;
    amount?: string;
    categoryId?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const data: CreateExpenseRequest | UpdateExpenseRequest = {
      title: title.trim(),
      amount: Number(amount),
      categoryId,
      date: formatDateForMySQL(date),
    };

    onSubmit(data);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (categoriesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Title</Text>
          <Input
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            placeholder="Enter expense title"
            error={errors.title}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Amount</Text>
          <Input
            value={amount}
            onChangeText={(text) => {
              setAmount(text);
              if (errors.amount) setErrors({ ...errors, amount: undefined });
            }}
            placeholder="0.00"
            keyboardType="decimal-pad"
            error={errors.amount}
            leftIcon={<Text style={styles.currencySymbol}>$</Text>}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category</Text>
          {errors.categoryId && (
            <Text style={styles.errorText}>{errors.categoryId}</Text>
          )}
          <View style={styles.categoriesGrid}>
            {categories?.map((category) => {
              const isSelected = categoryId === category.id;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    isSelected && {
                      backgroundColor: category.color + "20",
                      borderColor: category.color,
                    },
                  ]}
                  onPress={() => {
                    setCategoryId(category.id);
                    if (errors.categoryId)
                      setErrors({ ...errors, categoryId: undefined });
                  }}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={24}
                    color={isSelected ? category.color : Colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.categoryItemText,
                      isSelected && { color: category.color },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(!showDatePicker)}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <View style={styles.datePickerInfo}>
              <Text style={styles.datePickerText}>
                Date picker requires @react-native-community/datetimepicker.
                Currently showing: {formatDate(date)}
              </Text>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
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
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    marginBottom: 8,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 8,
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 12,
  },
  datePickerInfo: {
    marginTop: 8,
    padding: 12,
    backgroundColor: Colors.warning + "20",
    borderRadius: 8,
  },
  datePickerText: {
    fontSize: 13,
    color: Colors.text,
  },
  dateButtonText: {
    fontSize: 16,
    color: Colors.text,
  },
  submitButton: {
    marginTop: 12,
  },
});
