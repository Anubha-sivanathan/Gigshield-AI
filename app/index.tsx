import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [screen, setScreen] = useState("login");
  const [payout, setPayout] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulateTrigger = (type) => {
    let amount = 0;
    if (type === "rain") amount = 400;
    if (type === "heat") amount = 300;
    if (type === "app") amount = 500;

    setPayout({ type, amount });
    setScreen("claim");
  };

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=13.08&longitude=80.27&current_weather=true",
      );
      const data = await res.json();

      if (data.current_weather.temperature > 35) {
        simulateTrigger("heat");
      } else {
        Alert.alert("No extreme condition detected");
      }
    } catch {
      Alert.alert("Error fetching weather");
    }
  };

  const processPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScreen("success");
    }, 2000);
  };

  const ButtonCard = ({ title, onPress, color = "#4F46E5" }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        padding: 14,
        marginVertical: 6,
        borderRadius: 12,
      }}
    >
      <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
    </TouchableOpacity>
  );

  const BackButton = () => (
    <TouchableOpacity onPress={() => setScreen("dashboard")}>
      <Text style={{ color: "#4F46E5", marginBottom: 10 }}>← Back</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E0E7FF",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          elevation: 5,
        }}
      >
        {/* HEADER */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>GigShield AI</Text>
          <Text>👤</Text>
        </View>

        {/* LOGIN */}
        {screen === "login" && (
          <>
            <TextInput
              placeholder="Enter Name"
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
            <TextInput
              placeholder="Location"
              style={{
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
            <ButtonCard
              title="Get Protected"
              onPress={() => setScreen("dashboard")}
            />
          </>
        )}

        {/* DASHBOARD */}
        {screen === "dashboard" && (
          <>
            <Text style={{ marginTop: 10 }}>👤 Delivery Partner</Text>
            <Text>📍 Chennai</Text>

            <View
              style={{
                backgroundColor: "#F3F4F6",
                padding: 15,
                borderRadius: 12,
                marginTop: 10,
              }}
            >
              <Text>💰 ₹1200 Protected</Text>

              <View
                style={{
                  height: 10,
                  backgroundColor: "#ddd",
                  marginTop: 5,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    width: "80%",
                    height: "100%",
                    backgroundColor: "red",
                    borderRadius: 10,
                  }}
                />
              </View>

              <Text style={{ color: "red" }}>HIGH RISK</Text>
            </View>

            <ButtonCard
              title="Go to Triggers"
              onPress={() => setScreen("trigger")}
            />
            <ButtonCard
              title="📊 Admin Dashboard"
              onPress={() => setScreen("admin")}
              color="#10B981"
            />
          </>
        )}

        {/* TRIGGER */}
        {screen === "trigger" && (
          <>
            <BackButton />
            <ButtonCard
              title="🌧 Rain"
              onPress={() => simulateTrigger("rain")}
            />
            <ButtonCard
              title="🌡 Heat"
              onPress={() => simulateTrigger("heat")}
              color="#F59E0B"
            />
            <ButtonCard
              title="📱 App Failure"
              onPress={() => simulateTrigger("app")}
              color="#EF4444"
            />
            <ButtonCard
              title="🌦 Live Weather"
              onPress={fetchWeather}
              color="#10B981"
            />
          </>
        )}

        {/* CLAIM */}
        {screen === "claim" && (
          <>
            <BackButton />
            <Text>Event: {payout.type}</Text>
            <Text>Payout: ₹{payout.amount}</Text>

            <ButtonCard title="Process Payment" onPress={processPayment} />
          </>
        )}

        {/* LOADING */}
        {loading && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <ActivityIndicator size="large" />
            <Text>Processing Payment...</Text>
          </View>
        )}

        {/* SUCCESS */}
        {screen === "success" && (
          <>
            <Text style={{ fontSize: 40, textAlign: "center" }}>💰</Text>
            <Text style={{ textAlign: "center" }}>
              ₹{payout?.amount} Credited
            </Text>
            <ButtonCard
              title="Back to Dashboard"
              onPress={() => setScreen("dashboard")}
            />
          </>
        )}

        {/* ADMIN DASHBOARD */}
        {screen === "admin" && (
          <>
            <BackButton />
            <Text style={{ fontSize: 18 }}>📊 Admin Insights</Text>
            <Text>Total Workers: 120</Text>
            <Text>Claims Today: 18</Text>
            <Text>High Risk Zones: 3</Text>
            <Text>Fraud Alerts: 1</Text>
          </>
        )}
      </View>
    </View>
  );
}
