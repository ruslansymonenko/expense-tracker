import { useAuth } from "@/contexts/AuthContext";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface LoginFormData {
  email: string;
  password: string;
}

interface Props {}

export const LoginForm: React.FC<Props> = (props) => {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      Alert.alert("Login Failed", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Email is invalid",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={
              <Ionicons
                name="mail-outline"
                size={20}
                color={Colors.textSecondary}
              />
            }
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
            secureTextEntry
            icon={
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={Colors.textSecondary}
              />
            }
          />
        )}
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        style={styles.loginButton}
      />

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button
        title="Create Account"
        onPress={() => router.push("/register")}
        variant="outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  loginButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: "500",
  },
  testCredentials: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.primaryLight + "10",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  testText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
});
