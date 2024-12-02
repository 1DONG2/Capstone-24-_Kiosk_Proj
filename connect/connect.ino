const int ledPin = 9; // LED 핀 번호

void setup() {
  pinMode(ledPin, OUTPUT);      // LED 핀을 출력 모드로 설정
  Serial.begin(9600);           // 시리얼 통신 시작 (9600 baud)
}

void loop() {
  if (Serial.available() > 0) { // 시리얼 입력 확인
    int brightness = Serial.parseInt(); // 입력된 숫자 읽기
    if (brightness >= 0 && brightness <= 255) { 
      analogWrite(ledPin, brightness);  // LED 밝기 조절
    }
  }
}
