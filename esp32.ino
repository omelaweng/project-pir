// #include <WiFi.h>
// #include <HTTPClient.h>

// #define PIR_PIN 13          // Pin where the PIR sensor is connected
// #define WIFI_SSID "omelaweng!"     // Your WiFi name
// #define WIFI_PASS "kamasat0" // Your WiFi password
// #define API_KEY "Gikhp404crZvkMJyhOOwTl7e8allm12gqLbeogFuv21j9rlK9s6qM16VcDwlkk1VJ9iUisiKDrDTYSkkRAxjq3Eu8nTIfytMXSOQxmMaDWb2XxPUuH1eY3EmRFij3Ohl"

// // Initialize PIR sensor pin
// void setup() {
//     Serial.begin(115200);
    
//     // Initialize WiFi
//     WiFi.begin(WIFI_SSID, WIFI_PASS);
//     Serial.println("Connecting to WiFi...");
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(500);
//         Serial.print(".");
//     }
//     Serial.println("Connected to WiFi!");

//     // Set up PIR pin mode
//     pinMode(PIR_PIN, INPUT);
// }

// void loop() {
//     // Read PIR sensor status
//     bool motionDetected = digitalRead(PIR_PIN);
    
//     if (motionDetected) {
//         Serial.println("Motion detected!");
//     } else {
//         Serial.println("No motion detected.");
//     }
    
//     send_sensor_data(motionDetected);

//     // Debug output
//     Serial.printf("Motion Detected: %s\n", motionDetected ? "YES" : "NO");

//     // Delay before the next reading
//     delay(1000);  // Wait 1 second
// }

// void send_sensor_data(bool motionDetected) {
//     if (WiFi.status() == WL_CONNECTED) {
//         HTTPClient http;  // Create an HTTPClient instance
//         String url = "http://172.20.10.4:3300/sensor-data";  // Update with your server IP

//         // Prepare the JSON payload
//         String post_data = "{\"motionDetected\":" + String(motionDetected) + "}";

//         // Configure the HTTP request
//         http.begin(url);  // Specify the URL
//         http.addHeader("Content-Type", "application/json");  // Specify content-type header
//         http.addHeader("api_key", API_KEY);  // Add API Key in the header

//         // Send the request
//         int httpResponseCode = http.POST(post_data);  // Send the HTTP POST request

//         // Check for the response
//         if (httpResponseCode > 0) {
//             Serial.printf("HTTP Response code: %d\n", httpResponseCode);
//             if (httpResponseCode == 200) {
//                 Serial.println("Data sent successfully");
//             }
//         } else {
//             Serial.printf("Error sending data: %s\n", http.errorToString(httpResponseCode).c_str());
//         }
//         http.end();  // Close connection
//     } else {
//         Serial.println("WiFi not connected");
//     }
// }


#include <WiFi.h>
#include <HTTPClient.h>

#define PIR_PIN 13          // Pin where the PIR sensor is connected
#define WIFI_SSID "omelaweng!"     // Your WiFi name
#define WIFI_PASS "kamasat0" // Your WiFi password
#define API_KEY "Gikhp404crZvkMJyhOOwTl7e8allm12gqLbeogFuv21j9rlK9s6qM16VcDwlkk1VJ9iUisiKDrDTYSkkRAxjq3Eu8nTIfytMXSOQxmMaDWb2XxPUuH1eY3EmRFij3Ohl" // Your API Key

int objectCount = 0; // ตัวแปรนับจำนวนวัตถุ

// Initialize PIR sensor pin
void setup() {
    Serial.begin(115200);
    
    // Initialize WiFi
    WiFi.begin(WIFI_SSID, WIFI_PASS);
    Serial.println("Connecting to WiFi...");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("Connected to WiFi!");

    // Set up PIR pin mode
    pinMode(PIR_PIN, INPUT);
}

void loop() {
    // Read PIR sensor status
    bool motionDetected = digitalRead(PIR_PIN);
    
    static bool lastState = false;
    if (motionDetected && !lastState) {
        Serial.println("Motion detected!");
        objectCount++; // เพิ่มค่าตัวแปรนับเมื่อมีการตรวจจับการเคลื่อนไหว
        send_sensor_data(objectCount);
    } else if (!motionDetected && lastState) {
        Serial.println("No motion detected.");
    }
    lastState = motionDetected;

    // Debug output
    Serial.printf("Motion Detected: %s, Total Objects: %d\n", motionDetected ? "YES" : "NO", objectCount);

    // Delay before the next reading
    delay(1000);  // Wait 1 second
}

void send_sensor_data(int count) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;  // Create an HTTPClient instance
        String url = "http://172.20.10.4:3300/sensor-data";  // Update with your server IP

        // Prepare the JSON payload
        String post_data = "{\"objectCount\":" + String(count) + "}";

        // Configure the HTTP request
        http.begin(url);  // Specify the URL
        http.addHeader("Content-Type", "application/json");  // Specify content-type header
        http.addHeader("api_key", API_KEY);  // Add API Key in the header

        // Send the request
        int httpResponseCode = http.POST(post_data);  // Send the HTTP POST request

        // Check for the response
        if (httpResponseCode > 0) {
            Serial.printf("HTTP Response code: %d\n", httpResponseCode);
            if (httpResponseCode == 200) {
                Serial.println("Data sent successfully");
            }
        } else {
            Serial.printf("Error sending data: %s\n", http.errorToString(httpResponseCode).c_str());
        }
        http.end();  // Close connection
    } else {
        Serial.println("WiFi not connected");
    }
}
