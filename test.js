const baseUrl = "https://opentdb.com/api.php?amount=10"

const furl = async (url) => {
    const ret = await fetch(url)
    let r;
    if (ret) {
        console.log(
            "ret => ", ret
        )
        r = ret.json()
    }

    return r;
}

console.log("data => ", furl(baseUrl))
