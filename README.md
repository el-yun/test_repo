# Dunamu Frontend Homework

## Development Setup

### 해당 repository 가 담고 있는 source code 에 대한 설명

    ├── assets                  # 제공받은 퍼블리싱 결과물 및 스타일
    ├── docs                    # 제공받은 과제전형 가이드 이미지
    ├── src                     # 소스 폴더
    │   ├── api                 # HTTP 통신 관련 소스 - react-query 및 error 처리 등.
    │   ├── client              # Application Root에 해당하는 컴포넌트 소스
    │   ├── interfaces          # 해당 소스에서 사용되고있는 타입스크립트 인터페이스를 가지고있는 소스
    │   ├── store               # redux 관련 소스 
    │   ├── table               # 과제에서 표시되는 Table 컴포넌트에 관련된 소스
    │   └── util                # helper 함수가 존재하는 파일
    │
    ├── .gitignore              # 커밋제외할 것들에 대한 명세서.
    ├── ts-config.js            # typescript 관련 설정 파일
    └── package.json            # 어플리케이션의 패키지에 관한 정보와 의존중인 버전에 관한 정보를 담고있는 파일.

### Prerequisites

- Install Node.js which includes Node Package Manager (yarn)

### Setting Up a Project

1. 프로젝트를 clone 한다

    ```bash
    $ git clone 
    ```

2. Package 를 설치한다

    ```bash
    $ cd dunamu-frontend-homework
    $ yarn install
    ```

3. Run

    ```bash
    # current directory: $PROJECT_ROOT
    $ yarn start
    ```

## Requirement
- assets 폴더를 참고하여 markup 연동합니다
  - assets 폴더의 css 는 수정하면 안됩니다
- 코인 마켓정보 API 로 코인리스트를 받아서 원화마켓, BTC마켓, USDT 마켓으로 분류하여 노출합니다
  (master API: https://api.upbit.com/v1/market/all)
  (market: KRW-BTC 일 경우 KRW 마켓의 BTC 코인을 의미)
  - docs/market_response.png 에 응답 명세서가 있습니다
- 코인 시세 API 로 시세를 노출합니다
  (ticker API: https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH)
  (ticker API docs: https://docs.upbit.com/reference#ticker%ED%98%84%EC%9E%AC%EA%B0%80-%EB%82%B4%EC%97%AD)
  - docs/docs/ticker_params.png 에 요청 파라미터 명세서가 있습니다
  - docs/ticker_response.png 에 응답 명세서가 있습니다
- 테이블 상단 헤더를 사용하여 한글명 / 영문명 change 가 가능하고 그에 따라 한글명, 영문명으로 표현합니다
- 현재가, 전일대비, 거래대금에 대해서 정렬이 됩니다
   - 기본값은 거래대금에 대해서 내림차순으로 시작  
   - 한번 누르면 내림차순, 다시 누르면 오름차순
   - 현재가, 전일대비, 거래대금 중 한가지의 필드로만 정렬
   - 동일한 값에 대해서는 한글이름순 정렬
- 현재가와 전일대비에 대해서 상승, 하락, 보합에 대해서 색상을 다르게 표현합니다
   - 상승: 빨강, 하락: 파랑, 보합: 검정 
- 각 숫자에 대해서 적절한 포맷팅을 합니다
   - KRW 마켓의 경우 100원 미만은 소수점 2자리, 그 이상은 정수부만 표현
   - BTC 마켓의 경우 소수점 8자리로 표현
   - USDT 마켓의 경우 소수점 3자리로 표현
   - 천단위 구분자는 comma로 표현
   - KRW 마켓 거래대금의 경우 백만을 넘어가면 백만 단위로 표현
- 당일 봉차트를 표현합니다
   - 전일종가를 기준점으로 설정 
   - 상단 10%, 하단 -10% 로 표현
     - 예를들어 전일종가 100원, 시가, 저가 100원, 고가, 종가 200원 이라면 절반이 빨간색으로 가득찬 봉차트여야 합니다
     - ( 예시에서 에이다 코인 케이스 )
- 5초에 한번 시세를 다시 조회하도록 하고, 컴포넌트 재랜더링을 최소화하는 작업이 필요합니다
  - 다시 조회할때 업비트처럼 현재가에 박스가 생겼다가 사라지는 효과가 있어도 좋습니다
- 필요하다면 추가 npm 라이브러리 설치도 가능합니다

## Screenshot
![스크린샷](https://static.upbit.com/web-assets/coinlist2.png)
