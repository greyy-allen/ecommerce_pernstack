import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

//init arcjet
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules: [
        shield({mode:"LIVE"}),
        // bot detection
        detectBot({
            mode:"LIVE",
            allows:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate limiting

        tokenBucket({
            mode:"LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10
        })
    ]
})


