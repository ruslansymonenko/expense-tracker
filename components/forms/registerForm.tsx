import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Props {}

export const RegisterForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await registerUser(data.email, data.password, data.name);
    } catch (error) {
      Alert.alert("Registration Failed", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="name"
        rules={{
          required: "Name is required",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Full Name"
            placeholder="Enter your name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.name?.message}
            icon={
              <Ionicons
                name="person-outline"
                size={20}
                color={Colors.textSecondary}
              />
            }
          />
        )}
      />

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

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.confirmPassword?.message}
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
        title="Create Account"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        style={styles.registerButton}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Button title="Login" onPress={() => router.back()} variant="outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  registerButton: {
    marginTop: 8,
  },
  loginContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
});
