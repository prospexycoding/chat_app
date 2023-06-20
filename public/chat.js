// upload logic

let avatar = document.querySelector('.avatar')
let my_file = document.querySelector('.file')
let uploaded_img = ''

my_file.addEventListener('change',(event)=>{
   event.preventDefault()

   let chosen_file = file.files[0]

   if(chosen_file){
      let reader = new FileReader()

      reader.addEventListener('load',(event)=>{
         event.preventDefault()

         avatar.src = reader.result
         uploaded_img = reader.result

      })

      reader.readAsDataURL(chosen_file)
   }
})


// upload logic ends here

// input validation & to display start button 
let input_name = document.querySelector('.input')

document.querySelector('.input-btn').addEventListener('click',(event)=>{

   if(input_name.value < 1){
      input_name.classList.add('error')

      setTimeout(() => {
         input_name.classList.remove('error')
         
      },1000);
   }else{
      event.preventDefault()

      document.querySelector('.prof').src = uploaded_img
      document.querySelector('.names').innerHTML = input_name.value
   
      document.querySelector('.welcome').style.display = "flex"
   }


})

// to display the chating page
let start = document.querySelector('.start')

start.addEventListener('click',()=>{
   if(input_name.value < 1){
      input_name.classList.add('error')

      setTimeout(() => {
         input_name.classList.remove('error')
         
      },1000);
   }else{
      document.querySelector('.start-chat').style.display = "none"
      document.querySelector('.chatting-page').style.display = "flex"

   }
 
})


const chatting_env = document.querySelector('.chatting-env')
const send_message = document.querySelector('.send-message-box')
const texting = document.querySelector('.texting')

// connect to socket
const socket = io.connect()

send_message.addEventListener('submit',(event)=>{
   event.preventDefault()

   onSentMessages()
})


function onSentMessages(){

   let data ={
      handle:input_name.value,
      message:texting.value,
      datesent:new Date().toLocaleString()
   }


   socket.emit('chat', data)

   populateChat(true,data)
}

function populateChat(isMyChat, data){
   const element = 
                      `
                  <div class=${isMyChat ? "right" : "left"}>

                          <h3 class="name">${data.handle}</h3>
                          <p>${data.message}</p>
                          <h4 class="time">${data.datesent}</h4>

                  </div>
                      
                      
                      `
                      chatting_env.innerHTML += element


}


socket.on('chatmessage',(data)=>{
        populateChat(false,data)
})
