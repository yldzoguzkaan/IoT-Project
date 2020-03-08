#include <ThingSpeak.h>
#include <ESP8266WiFi.h>

#define KIRMIZI D0
#define MAVI D1

//const char* ssid = "FiberHGW_ZTHX62_5GHz";
//const char* password = "F4e7pNgYAc";

const char* ssid = "OKY";
const char* password = "oky12345";

const char * apiWritekey = "4IWBY0HE7STLP00M";
const char * apiReadkey = "S4UIBKE3X1YRJN79";
const char* server = "api.thingspeak.com";

unsigned long channelID = 900937;
float resolution = 3.3/1024;

WiFiClient client;

void wifiyeBaglan(){
  WiFi.begin(ssid, password);
 
  Serial.println();
  Serial.println();
  Serial.print("Baglanacak wifi adi  ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("NodeMcu wifiye baglaniyor...");
  Serial.println(ssid);
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  delay(10);

  
  
  pinMode(KIRMIZI, OUTPUT);
  pinMode(MAVI, OUTPUT); 
  wifiyeBaglan();
  ThingSpeak.begin(client);
}
 
void loop() {
  sicaklikVerisiniThingSpeakaYaz();
}

void sicaklikVerisiniThingSpeakaYaz(){
  float anlikSicaklik = (analogRead(A0) * resolution) * 100;
  Serial.print("Sicaklik:");
  Serial.print(anlikSicaklik);
  Serial.println();
  Serial.print("%send to Thingspeak");
  Serial.println("Waiting…");
  ThingSpeak.writeField(channelID, 1, anlikSicaklik, apiWritekey);
  float istenenSicaklik = ThingSpeak.readFloatField(channelID,2,apiReadkey);
  Serial.println(istenenSicaklik);
  if(anlikSicaklik > istenenSicaklik ){
    Serial.println("Mavi Led Yanacaktir.");
    digitalWrite(MAVI, HIGH);
    digitalWrite(KIRMIZI, LOW);
  }else{
    Serial.println("Kirmizi Led Yanacaktir.");
    digitalWrite(KIRMIZI, HIGH);
    digitalWrite(MAVI, LOW);
  }
  delay(15000);
}
