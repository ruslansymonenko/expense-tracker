import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../../components/ui/Card";
import { Colors } from "../../../constants/colors";
import { useCategories } from "../../../hooks/useCategories";
import { useDeleteExpense, useExpense } from "../../../hooks/useExpenses";

export default function TransactionDetailsPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: transaction, isLoading, error } = useExpense(id as string);
  const { data: categories } = useCategories();
  const deleteExpense = useDeleteExpense();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle"
            size={64}
            color={Colors.textSecondary}
          />
          <Text style={styles.errorText}>
            {error ? "Failed to load transaction" : "Transaction not found"}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const category = categories?.find((cat) => cat.id === transaction.categoryId);
  const categoryColor = category?.color || Colors.expense.other;
  const categoryIcon = (category?.icon || "ellipsis-horizontal") as any;

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEdit = () => {
    router.push(`/(tabs)/transactions/edit?id=${id}` as any);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteExpense.mutate(id as string, {
              onSuccess: () => {
                router.back();
              },
            });
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.amountCard}>
          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Amount</Text>
            <Text style={styles.amountValue}>
              ${transaction.amount.toFixed(2)}
            </Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <View style={styles.categoryContainer}>
              <View
                style={[
                  styles.categoryIcon,
                  { backgroundColor: categoryColor + "20" },
                ]}
              >
                <Ionicons
                  name={categoryIcon as any}
                  size={20}
                  color={categoryColor}
                />
              </View>
              <Text style={styles.detailValue}>
                {category?.name || "Other"}
              </Text>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title</Text>
            <Text style={styles.detailValue}>{transaction.title}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {formatDate(transaction.date)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>
              {formatTime(transaction.date)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction ID</Text>
            <Text style={styles.detailValueSmall}>{transaction.id}</Text>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.notesLabel}>Notes</Text>
          <Text style={styles.notesPlaceholder}>
            No notes added for this transaction
          </Text>
        </Card>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={handleEdit}
          >
            <Ionicons name="create-outline" size={20} color={Colors.surface} />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={20} color={Colors.surface} />
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  amountCard: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 12,
    backgroundColor: Colors.primary,
  },
  amountSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.surface,
    opacity: 0.9,
    marginBottom: 8,
    fontWeight: "500",
  },
  amountValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.surface,
  },
  card: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  detailValueSmall: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: "600",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 8,
  },
  notesLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "500",
    marginBottom: 8,
  },
  notesPlaceholder: {
    fontSize: 14,
    color: Colors.textLight,
    fontStyle: "italic",
  },
  actionsContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  editButton: {
    backgroundColor: Colors.primary,
  },
  deleteButton: {
    backgroundColor: Colors.error,
  },
  actionButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 32,
  },
});
