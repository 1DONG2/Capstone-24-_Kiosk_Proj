import serial
import time
import firebase_admin
from firebase_admin import credentials, firestore

# 아두이노 연결
arduino_port = "COM3" #window
# arduino_port = "/dev/ttyACM0" #raspberry pi
arduino = serial.Serial(port=arduino_port, baudrate=9600, timeout=1)

# 1. Firebase 연결 설정
cred = credentials.Certificate("./serviceAccountKey.json")  # 서비스 계정 키 경로
firebase_admin.initialize_app(cred)

# Firebase Firestore 인스턴스
db = firestore.client()

doc_ref = db.collection('test').document('open')

def set_led_brightness(brightness):
    """아두이노 LED 밝기 설정"""
    if 0 <= brightness <= 255:
        arduino.write(f"{brightness}\n".encode())  # 아두이노로 데이터 전송
        print(f"LED 밝기: {brightness}")
        time.sleep(0.1)  # 전송 후 잠시 대기
    else:
        print("밝기 값은 0에서 255 사이여야 합니다.")

def get_brightness_from_firebase(doc_snapshot, changes, read_time):
    """Firestore에서 데이터 변경 감지 시 호출되는 콜백 함수"""
    # 문서 데이터를 가져와서 'a' 값 읽기
    for doc in doc_snapshot:
        print(f"Received document snapshot: {doc.id}")
        data = doc_ref.get().to_dict()
        print(data)
        test = {'A': 10, 'B': 100, 'C': 200, '': 255}
        brightness = test[data['request']] # data[key]

        if brightness is not None:
            print(f"Firebase에서 읽은 LED 밝기 값: {brightness}")
            set_led_brightness(int(brightness))  # 아두이노에 밝기 전송
        else:
            print("Firebase 문서에 'a' 키가 없습니다.")

# Firestore에서 실시간 데이터 변경 감지
def watch_firebase():
    # 실시간 리스너 설정
    doc_ref.on_snapshot(get_brightness_from_firebase)

# 3. 메인 실행
if __name__ == "__main__":
    # Firebase 문서 변경 사항을 실시간으로 감지
    watch_firebase()

    # 프로그램이 종료되지 않도록 대기
    try:
        while True:
            time.sleep(1)  # 주기적으로 대기 (계속 실행되도록)
    except KeyboardInterrupt:
        print("프로그램 종료")
    finally:
        arduino.close()  # 시리얼 포트 닫기
