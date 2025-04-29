// src/components/Network.jsx

import React, { useState, useEffect } from "react";
// axios와 같은 HTTP 클라이언트 라이브러리를 사용할 예정
// import axios from 'axios';

// 옵저버 패턴 구현을 위한 EventEmitter 또는 Context API 등을 활용 예정
// import EventEmitter from 'events';
// const networkEventEmitter = new EventEmitter(); // 예시

const Network = ({ children }) => {
  // 컴포넌트 내부에서 관리할 상태 (예: 로딩 상태, 에러 상태 등)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // 서버로부터 받아온 데이터

  // TODO: 옵저버 패턴 구현 (나중에 추가)
  // Subject 역할을 하며, 데이터 변경 시 등록된 옵저버들에게 알림

  // 서버로부터 데이터를 가져오는 비동기 함수 (GET 요청 예시)
  const fetchData = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      // 실제 서버 요청 코드 (axios 사용 예시)
      // const response = await axios.get(url, options);
      // const resultData = response.data;

      // 임시 데이터 (나중에 삭제)
      const resultData = {
        message: `데이터를 성공적으로 받아왔습니다: ${url}`,
      };
      console.log("데이터 받아옴:", resultData);

      setData(resultData); // 상태 업데이트
      // TODO: 데이터 변경 시 옵저버들에게 알림 (나중에 추가)
      // networkEventEmitter.emit('dataUpdated', resultData); // 예시

      return resultData; // 데이터를 사용하고자 하는 곳으로 반환
    } catch (err) {
      console.error("데이터 로딩 오류:", err);
      setError(err);
      // TODO: 에러 발생 시 옵저버들에게 알림 (필요시)
      throw err; // 오류를 다시 던져서 외부에서 처리할 수 있도록 함
    } finally {
      setIsLoading(false);
    }
  };

  // 서버로 데이터를 보내는 비동기 함수 (POST 요청 예시)
  const postData = async (url, postData, options = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      // 실제 서버 요청 코드 (axios 사용 예시)
      // const response = await axios.post(url, postData, options);
      // const resultData = response.data;

      // 임시 데이터 (나중에 삭제)
      const resultData = {
        message: `데이터를 성공적으로 보냈습니다: ${url}`,
        sentData: postData,
      };
      console.log("데이터 보냄:", resultData);

      // TODO: 필요시 상태 업데이트 및 옵저버들에게 알림
      // setData(resultData);
      // networkEventEmitter.emit('dataPosted', resultData); // 예시

      return resultData;
    } catch (err) {
      console.error("데이터 전송 오류:", err);
      setError(err);
      // TODO: 에러 발생 시 옵저버들에게 알림 (필요시)
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 초기 데이터를 가져오는 예시 (필요시 활성화)
  // useEffect(() => {
  //   // 초기 데이터 로딩
  //   // fetchData('/api/initial-data');
  // }, []); // 빈 배열은 컴포넌트 마운트 시 한 번만 실행

  // Network 컴포넌트를 사용하는 다른 컴포넌트들이 Network 기능을 사용할 수 있도록 Context 또는 Prop으로 전달
  // 여기서는 children Prop을 사용하여 하위 컴포넌트들을 렌더링하며, 필요한 기능을 전달할 방법을 고려해야 합니다.
  // Context API를 사용하는 것이 일반적입니다.

  // TODO: Context API를 사용하여 fetchData, postData, isLoading, error, data 등을 하위 컴포넌트에 제공 (추천)
  // import { NetworkProvider } from './NetworkContext'; // 예시
  // return (
  //   <NetworkProvider value={{ fetchData, postData, isLoading, error, data, networkEventEmitter }}>
  //     {children}
  //   </NetworkProvider>
  // );

  // 임시로 children을 바로 렌더링하고, 기능 전달 방식은 Context API 구현 시 변경
  return (
    <>
      {/* 로딩 또는 에러 상태 표시 UI (선택 사항) */}
      {isLoading && <p>데이터 로딩 중...</p>}
      {error && <p>오류 발생: {error.message}</p>}

      {/* 자식 컴포넌트들을 렌더링 */}
      {children}
    </>
  );
};

export default Network;
