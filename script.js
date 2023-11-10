const images = document.querySelector(".images")
const button = document.querySelector("button")
const input_user = document.querySelector("#input_user")
const apiKey = "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"
const ai_url = "https://api.openai.com/v1/images/generations"

// main function
async function handleRequest() {
    try {
        // clear input
        input_user.value = "";
        // Clear previous images
        images.innerHTML = "";

        // Prepare the request options
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
                "Permissions-Policy": "attribution-reporting=(self)",
                // Add other Permissions-Policy headers as needed
            },
            body: JSON.stringify({
                "prompt": input_user.value,
                "n": 3,
                "size": "512x512"
            })
        };

        // Make the API request
        const response = await fetch(ai_url, requestOptions);

        // Log the response status and message
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Message: ${response.statusText}`);

        // Handle server errors (status codes other than 2xx)
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        // Parse response data
        const data = await response.json();

        // Handle client-side errors in the API response
        if (data.error) {
            throw new Error(`API error: ${data.error.message}`);
        }

        // Render images
        data.data.forEach(imageUrl => {
            const container_image = document.createElement("div");
            const img = document.createElement("img");
            img.src = imageUrl.url;
            container_image.appendChild(img);
            images.appendChild(container_image);
        });

    } catch (error) {
        // Handle any errors occurred during the process
        console.error(`Error: ${error.message}`);
    }
}

button.onclick = async () => {
    handleRequest()
};
input_user.addEventListener("keyup", async (event) => {
    if (event.key == "Enter") {
        handleRequest()
    }
})

