<!--template : 사용자가 브라우저에서 볼 수 있는 형태의 html로 변환해주는 속성
  입니다!!!!!!!!!!!!!!!!!!-->
<template>
  <div class="container">
    <div class="messages">
      <!-- 메세지를 1번 반복한다.
      key는 message, authorName은 작성자
      date는 날짜를 쓰기 위함. 지정하지 않으면 현재 시간
      my github버튼을 누르면 아래 링크로 이동-->
      <ChannelMessage
        v-for="message in 1"
        :key="message"
        authorName="채널 안내"
        :date="getDate"
      >
        Well come to my discord-clone. See this project in
        <a class="link" href="https://github.com/Dongnic"
          >my github</a
        >
      </ChannelMessage>
      <!--메세지 1번 반복, 작성자는 Bot-->
      <ChannelMessage
        isBot
        hasMention
        v-for="message in 1"
        :key="message"
        authorName="Bot"
        :date="getDate"
      >
        <Mention>{{userInfo.username}}</Mention> Hii, how are you ??
      </ChannelMessage>
      <ChannelMessage>{{userInfo}}</ChannelMessage>
      <!--message 배열만큼 반복, User 1의 작성자가
      현재 날짜로-->
      <ChannelMessage
        :authorName="message.sender"
        :date="getDate"
        v-for="message in messagesArray"
        :key="message"
      >
        {{ message.content }}
      </ChannelMessage>

    <div v-for="(m, idx) in messagesArray" :key="idx">
      <div :class="m.style">
        <h5 style="margin:3px">
          {{ m.sender }}
        </h5>
        {{ m.content }}
      </div>
    </div>

    </div>
    <!-- text타입으로 message 작성input tag
    enter키를 누르면 작성한 메세지를 전송-->
    <div class="input-wrapper">
      <input
        type="text"
        name="message"
        v-model="content"
        placeholder="Type a message here, and press enter."
        id="input-message"
        @keypress.enter="sendMessage()"
      />
      <!--아이콘-->
      <div class="icon">
        <At :size="24" />
      </div>
    </div>
  </div>
</template>

<!-- 변수를 정의해놓은 import-->
<script>
/* eslint eqeqeq: "off" */
import At from 'vue-material-design-icons/At'
// import { io } from 'socket.io-client'
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
// Components
import ChannelMessage from './channel-message'
import Mention from './channel-mention'

export default {
  name: 'channel-data',
  props: {
    userInfo: Object
  },
  components: {
    At,
    ChannelMessage,
    Mention
  },
  data () {
    return {
      messagesArray: [],
      message: '',
      date: '',
      content: '',
      id: 1
    }
  },
  // Get initial messages from the server (enable the "created()" function to connect with the server)
  created () {
    // this.socket = io('http://192.168.0.20:8080/ws')
    // this.socket.on('getInitialMessages', messages => {
    //   this.messagesArray = messages
    // }),
    // socket 연결
    const socket = new SockJS('http://192.168.0.20:8080/ws')
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect({},
      frame => {
        console.log('success', frame)
        this.stompClient.subscribe('/sub/' + 1, res => {
          const jsonBody = JSON.parse(res.body)
          const m = {
            sender: jsonBody.userid.id,
            content: jsonBody.message,
            style: jsonBody.userid.id == this.id ? 'myMsg' : 'otherMsg'
          }
          this.messagesArray.push(m)
        })
      },
      err => {
        console.log('fail', err)
      }
    )
  },
  // Sending messages to server, and getting the returned messages
  methods: {
    // writeMessage (message) {
    //   this.socket.emit('sendMessage', message)
    //   this.message = ''
    //   this.getReturnedMessage()
    // },
    // getReturnedMessage () {
    //   this.socket.on('returnMessage', messages => {
    //     this.messagesArray = messages
    //   })
    // }
    sendMessage () {
      if (this.content.trim() != '' && this.stompClient != null) {
        const chatMessage = {
          message: this.content,
          chatroomid: { id: 1 },
          userid: { id: 1 }
        }
        this.stompClient.send('/pub/message', JSON.stringify(chatMessage), {})
        this.content = ''
      }
    }
  },
  // Get date
  computed: {
    getDate () {
      return new Date().toString()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  grid-area: cd;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-flow: column nowrap;
  background-color: var(--primary);
  flex: 1;
}

.input-wrapper {
  width: 100%;
  padding: 0 16px;
  height: 68px;

  input {
    margin-top: 12px;
    width: 100%;
    height: 44px;
    padding: 0 10px 0 57px;
    border-radius: 5px;
    color: var(--white);
    background-color: var(--chat-input);

    &::placeholder {
      color: var(--grey);
      font-size: 16px;
    }
  }

  .icon {
    color: var(--grey);
    position: relative;
    top: -50%;
    left: 14px;
    transition: 0.2s;
    width: 24px;
  }
}

.messages {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 46px - 68px);
  max-height: calc(100vh - 46px - 68px);
  overflow-y: scroll;

  .channelmessage:first-child {
    margin-top: 0;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--tertiary);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--primary);
  }
}

.link {
  color: var(--grey);
  outline: none;
}
</style>
