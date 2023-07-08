let searchBtn = document.querySelector('.search')
let loader = document.querySelector('.loader')
let gifsContainer = document.querySelector('.gifs-container')
let gifsWrapper = document.querySelector('.gifs-wrapper')
let q = 'fun'
let limit = 10

searchBtn.addEventListener('click', ()=>{
  let searchText = document.querySelector('.search-text')
  limit = 10
  q = searchText.value
  gifsContainer.innerHTML =``
  generateGifs()
  
})



const generateGifs = ()=>{
  gifsContainer.style.display = 'grid'
let url = `https://api.giphy.com/v1/gifs/search?api_key=x7cRiK78WDMcbFKSHFfGY6IYtb9PI8p4&q=${q}&limit=${limit}&offset=0&rating=g&lang=en`
fetch(url).then((res) => 
    res.json()
    // console.log(res)
).then((info) => {
    console.log(info.data)
     frames = info.data
    //  console.log(frames[0].images.downsized_medium.url)
    frames.forEach((frame) => {
      let gifContainer = document.createElement('div')
      let image = document.createElement('img')
      let copyLinkBtn = document.createElement('button') 
      image.setAttribute('src',frame.images.downsized_medium.url)
      image.style.width = '100%'
      image.style.height = '75%'
      copyLinkBtn.style.textAlign = 'center'
      copyLinkBtn.style.maxHeight = '30%'
      copyLinkBtn.style.padding = '5px'
      gifContainer.style.display = 'flex'
      gifContainer.className = 'gif-container'
      gifContainer.style.alignItems = 'center'
      gifContainer.style.flexDirection = 'column'
      gifContainer.style.gap = '15px'
      gifContainer.style.width = '80%'
      gifContainer.style.padding = '5px 5px 0 5px'
      gifContainer.style.backgroundColor = '#2b304d'
      copyLinkBtn.style.backgroundColor = '#13fc97'
      copyLinkBtn.style.color ='#2b304d'
      copyLinkBtn.style.width = '100%'
      copyLinkBtn.style.textAlign = 'center'
      copyLinkBtn.style.borderRadius = '10px'
      copyLinkBtn.style.fontWeight = 'bold'
      copyLinkBtn.innerText = 'Copy Link'
      gifsContainer.style.textAlign = 'center'
      
      
      image.onload = ()=>{
        limit --
        if (limit == 0) {
            loader.style.display = 'none' 
        }
      }
      gifContainer.appendChild(image)
      
      copyLinkBtn.onclick = ()=>{
      let copyLink = frame.images.downsized_medium.url
      navigator.clipboard.writeText(copyLink).then(() => {
        alert('Link Has Been Copied')
      }).catch(() => {
        alert('Link Has Been Copied')
        let hiddenInput =document.createElement('input').innerHTML = `${copyLink}`
        hiddenInput.select()
        document.exec('copy')
        document.body.removeChild(hiddenInput)

      })
     
      }
      
      gifContainer.appendChild(copyLinkBtn)
      
      gifsContainer.appendChild(gifContainer)
    }) 
})
}

window.onload = ()=>{
  generateGifs()
}