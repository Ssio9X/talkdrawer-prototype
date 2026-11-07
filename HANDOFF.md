# 인계 프롬프트 — 톡서랍 랜딩 9회차 개편 (2026-11-07)

> 새 Claude Code 세션에서 이 저장소를 연 뒤 **"HANDOFF.md 읽고 이어서 해줘"** 라고 하면 된다.
> 사용자는 한국어로 짧게 대화한다. 답도 한국어로, 짧고 쉽게.

---

## 0. Mac mini에서 시작하기

### 0-1. 준비 체크리스트 (사람이 먼저 확인)
| | 무엇 | 확인 방법 | 없으면 |
|---|---|---|---|
| ✅ 필수 | **저장소 코드** (이 MD에는 코드가 없다) | 저장소 폴더에서 `git pull` | `git clone https://github.com/Ssio9X/talkdrawer-prototype.git` |
| ✅ 필수 | **GitHub 로그인** (푸시·배포용) | `gh auth status` | `gh auth login` (계정 Ssio9X) |
| ✅ 필수 | **git 작성자 설정** (없으면 커밋 실패) | `git config user.name` | `git config user.name "서승오" && git config user.email "185078593+Ssio9X@users.noreply.github.com"` (저장소 안에서) |
| ◻︎ 권장 | **구글 문서·폼 연결** (1 Pager 직접 읽기) | Claude에게 "구글 문서 읽을 수 있어?" | 이 맥북과 **같은 Claude 계정**으로 로그인. 안 되면 문서 내용을 복사해 붙여넣기 |
| ◻︎ 선택 | **Chrome 확장** (화면 캡처 확인) | Claude에게 "브라우저 열어서 확인해줘" | 없어도 작업 가능. 사람이 직접 브라우저로 확인 |

### 0-2. Mac mini로 넘어가지 않는 것
- **Claude 메모리:** 이 맥북(MacBook Air)에만 있다. Mac mini의 Claude는 이전 대화를 모르므로 **이 문서가 유일한 맥락**이다.
- **Xcode SwiftUI 원본** `~/Desktop/Phi/IPS/TalkCloudPrototype/`: GitHub에 없다. 랜딩·UT 작업에는 필요 없다. SwiftUI 원본을 봐야 하면 AirDrop 등으로 따로 옮긴다.
- **바탕화면 사본** `~/Desktop/톡서랍_HANDOFF.md`(MacBook Air): 이 파일의 복사본이다. 최신본은 항상 저장소의 `HANDOFF.md`.

### 0-3. 시작 명령
```bash
cd ~/talkdrawer-prototype      # 위치를 모르면: find ~ -maxdepth 4 -type d -name talkdrawer-prototype
git switch main && git pull
gh auth status
python3 -m http.server 8767    # 로컬 확인: http://localhost:8767/landing-v9/
claude                         # → "HANDOFF.md 읽고 이어서 해줘"
```

- **`main`에 푸시하면 바로 공개된다**(GitHub Pages). 그래서 새 랜딩은 기존 `landing/`을 덮어쓰지 않고 **`landing-v9/index.html`** 에 따로 두었다. 공개 중인 `landing/`은 예전 A·B 버전 그대로다.
- 사용자가 "이걸로 바꿔줘"라고 하면 그때 `landing-v9/index.html`을 `landing/index.html`로 옮긴다(두 파일 모두 `../v3/?embed`를 쓰므로 경로는 그대로 맞는다).
- 배포 확인: `gh api repos/Ssio9X/talkdrawer-prototype/pages/builds/latest --jq '.status+" "+.commit[0:7]'`. Pages 캐시가 10분이라 직후에는 **Cmd+Shift+R**을 안내한다.
- 커밋 메시지는 한국어, 바뀐 것을 전부 적고 끝에 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## 1. 무엇을 하고 있나

IPS(Iterative Problem Solving) 수업 과제, 카카오톡 **톡서랍** 경험 개선 프로토타입.
- 기획 문서: 구글 문서 "[서승오] Iterative Problem Solving" (`1KRLigRFzdmywGZvcs6PNTXXGNdx5X27MhWtYtbHPt8c`)의 **'[9회차] 1 Pager'** 탭.
- 이번 목표 두 가지:
  1. **랜딩 페이지(`landing/index.html`)를 1 Pager 계획대로 고치고, v3(솔루션 C)를 랜딩에 옮긴다.** → 1차 수정 완료(아래 2번).
  2. **UT(사용성 테스트)까지 할 수 있는 솔루션 버전을 만든다.** → 아직 시작 안 함(아래 4번).

### 저장소 구조
| 경로 | 내용 |
|---|---|
| `landing/index.html` | 랜딩 한 파일(CSS·JS 인라인). 솔루션 A·B 데모는 이 파일 안의 자체 스크립트로 돈다 |
| `v1/` `v2/` `v3/` | 이터레이션 프로토타입. 셋 다 `assets/app.js` 하나를 `window.APP_VERSION`(1·2·3)으로 분기 |
| `assets/app.js`, `assets/style.css` | v1~v3 공용. v3 = Before → Solution C, iPhone 18 Pro(402×874), 22단계(`#1`~`#22`) |

- v1 = Before → 솔루션 A(만료 화면 재설계)
- v2 = Before → 솔루션 B(결제 전 톡서랍 온보딩 + 톡클라우드 안내)
- v3 = Before → 솔루션 C(사라진 사진·파일 수 → 복구 불가 → 톡서랍 기능 5장 → 구독). `#6`은 Before의 요금 시트 화면.

### 지켜야 할 규칙
- 명칭은 **'톡서랍'으로 통일**한다. 단, Before 장면 안의 실제 카카오 문구("톡클라우드를 이용해 보세요" 등)는 원문 그대로 둔다.
- 실명·사진·번호·폴더명·링크 같은 개인정보는 가린다. VOC 이름은 김XX·박XX·전XX처럼 표기한다.

## 2. 이번에 바꾼 것 (`landing-v9/index.html`)

1. **Hero:** 후킹 한 줄 "뭐야, 톡서랍 구독하면 사진 복구되는 거 아냐?" + "뭔데 왜 없는데;;" + "많은 사용자들이 톡서랍 기능에 대해 오해하고 있습니다." + 수치 줄.
2. **문제(#problem, '왜지?'):** 만료 사진 → 더 알아보기 → 굵은 제목 "그동안 사라진 162개 사진, 동영상"만 읽음 → 구독 → 그대로라 해지, 흐름으로 다시 씀.
3. **VOC 말풍선(#voc) 새 섹션:** 인터뷰 인용 세 개(원문 그대로).
4. **솔루션 C(#solution-c) 새 섹션:** `../v3/?embed`를 iframe으로 넣었다. 솔루션 A·B 섹션은 그 아래에 그대로 둠. 상단 메뉴·푸터·마무리 문구에 C를 추가.
5. **`assets/app.js`에 삽입 모드(`?embed`) 추가:** 버전 표시·힌트를 숨기고, 해시가 없으면 Solution C 첫 단계(11/22)부터 시작하며, 내용 높이를 `postMessage({tdEmbedHeight})`로 부모에 보낸다. 랜딩이 이 값으로 iframe 높이를 맞춘다.
6. **버그 수정:** v3의 솔루션 첫 화면 제목이 "Solution B"로 나오던 것을 "Solution C"로 고쳤다(공개된 v3에도 있던 오류).

### 확인한 것 / 못 한 것
- 로컬에서 977px 폭으로 Hero·VOC·솔루션 C 삽입(11/22 단계에서 시작, 높이 자동 조절)을 확인했다.
- **1440px 이상 넓은 화면과 390px 모바일은 아직 확인하지 못했다.** 넓은 화면에서는 v3의 패널과 폰이 좌우로 나란히 놓여야 한다. 모바일은 iframe이 길어지는데(약 1100px) 괜찮은지 봐야 한다.

## 3. 사용자에게 아직 확인받을 것

- **"X명" 수치:** 임시로 "인터뷰 4명 중 3명"을 넣었다. 실제 숫자를 받으면 Hero의 `.hero-stat`을 바꾼다.
- **"톡사랍"** 은 1 Pager 원문의 오타로 보고 "톡서랍"으로 고쳤다.
- **VOC "구치했어요":** 원문 그대로 두었다. '구독 취소'의 줄임말인지 오타인지 아직 답을 못 받았다.
- **솔루션 배치:** C를 A·B보다 위에 두고 A·B를 남겼다. A·B를 뺄지는 사용자가 정한다.
- **기대 효과(1 Pager 4번):** 문서가 비어 있어서 섹션 없이 HTML 주석 자리만 남겼다(`<!-- 기대 효과: ... -->`, `#solution-c` 바로 뒤).

## 4. 다음 작업: UT용 솔루션

아직 정해지지 않은 것. 시작 전에 사용자에게 물어볼 것:
1. 어느 솔루션(A·B·C)으로 UT를 하나? 비교하려면 버전마다 하나씩 만든다.
2. 진행 방식: 대면 관찰이면 안내 문구와 "다음" 버튼만 빼면 된다. 링크를 보내 혼자 하게 하면 과제 안내 화면, 성공 지점 표시, 걸린 시간·누른 곳 기록까지 필요하다.
3. 과제 문장: 정해둔 게 없으면 문제정의에 맞춰 초안을 잡는다(예: "지난달 풋살 모임 채팅방에서 받은 사진을 다시 찾아보세요").

구현 힌트: `app.js`의 단계 배열(`before`, `sol1`, `solB`, `solC`, `tail`)과 `data-hs` 핫스팟 구조를 그대로 쓰고, `?ut` 같은 모드를 하나 더 두면 기존 v1~v3를 건드리지 않고 만들 수 있다.

## 5. 관련 링크 (작업할 때 같이 띄워 둘 것)
| 무엇 | 링크 |
|---|---|
| **랜딩 계획 — 9회차 1 Pager** | https://docs.google.com/document/d/1KRLigRFzdmywGZvcs6PNTXXGNdx5X27MhWtYtbHPt8c/edit?tab=t.tizosdyup2qe |
| **v3(솔루션 C) 프로토타입** | https://ssio9x.github.io/talkdrawer-prototype/v3/#6 |
| **구글 폼** | https://docs.google.com/forms/d/e/1FAIpQLSdMNnh-HzdAdg6vs9CSK_wat__M6c1B6_8WmBDQ9HN_pW0Z7g/formResponse (사용자가 준 주소. `formResponse`는 제출 후 주소라 폼을 다시 열려면 끝을 `viewform`으로 바꾼다. UT 응답용인지 과제 제출용인지 사용자에게 확인) |
| **최신 랜딩(9회차 개편)** | https://ssio9x.github.io/talkdrawer-prototype/landing-v9/ |
- 공개 랜딩(예전 A·B 버전): https://ssio9x.github.io/talkdrawer-prototype/landing/
- v1 https://ssio9x.github.io/talkdrawer-prototype/v1/ · v2 …/v2/ · v3 …/v3/
- Xcode SwiftUI 원본(이 Mac에만 있음): `~/Desktop/Phi/IPS/TalkCloudPrototype/`. Mac mini에는 없을 수 있다.
