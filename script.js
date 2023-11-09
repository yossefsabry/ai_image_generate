const images = document.querySelector(".images")
const button = document.querySelector("button")
const input_user = document.querySelector("#input_user")
const apiKey = "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"
const ai_url = "https://api.openai.com/v1/images/generations"


button.onclick = async () => {
    images.innerHTML = ""
    const methods = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            "prompt": input_user.value,
            "n": 3,
            "size": "512x512"
        })
    }
    const res = await fetch(`${ai_url}`, methods)
    const data = await res.json()
    const listImages = data.data;

    listImages.map((image_url) => {
        const container_image = document.createElement("div")
        images.appendChild(container_image)
        const img = document.createElement("img")
        container_image.appendChild(img)

        img.src = image_url.url;
    })

    input_user.value = ""
}

