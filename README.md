## 도커 있어야됨

<li> 리눅스 기반 환경에서 make all 명령어 사용
<li> 이후 vsocde에서 docker 익스텐션 깔고 접속
<li> fastapi 실행은 make run-backend
<li> react 실행은 make run-frontend
<li> 프로젝트 루트 위치에 .env 만들어야 하는데 내용은 

```bash
DATABASE_URL=mongodb://swcompetition:swcompetition@localhost:27017/app?authSource=admin&retryWrites=true&w=majority
```
임