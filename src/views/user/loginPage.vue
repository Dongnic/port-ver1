<template>
  <div class="login">
    <h1>로그인 페이지</h1>
    <hr />
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="이메일 입력" /><br />
      <input type="password" name="password" placeholder="비밀번호 입력" /><br />
      <button type="submit">로그인</button>
    </form>
    <a href="/oauth2/authorization/google">구글 로그인</a> |
    <router-link to="/joinForm">가입하기</router-link> |
  </div>
</template>
