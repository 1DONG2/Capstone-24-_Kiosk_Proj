#include <Servo.h>

Servo servo1;  // 서보 1
Servo servo2;  // 서보 2
Servo servo3;  // 서보 3

const int servoPin1 = 9;
const int servoPin2 = 10;
const int servoPin3 = 11;

void setup() {
  Serial.begin(9600); // 시리얼 통신 시작
  servo1.attach(servoPin1);
  servo2.attach(servoPin2);
  servo3.attach(servoPin3);

  // 서보 초기 위치 설정
  servo1.write(90);
  servo2.write(90);
  servo3.write(90);
}

void loop() {
  if (Serial.available()) {
    char command = Serial.read(); // 명령 읽기

    switch (command) {
      case 'a': // 서보 1 제어
          servo1.write(0);
        break;

      case 'b': // 서보 2 제어
          servo2.write(0);
        break;

      case 'c': // 서보 3 제어
          servo3.write(0);
        break;

      default:
        // 잘못된 명령은 무시
        break;
    }
  }
}
