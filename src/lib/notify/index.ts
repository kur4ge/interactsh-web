/* eslint-disable camelcase */
// Notify

const formatBody = (params: {[key: string]: any}) => Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');

const headers = new Headers({
    'content-type': 'application/x-www-form-urlencoded'
})

export const notifyTelegram = async (msg: string, token: string, target: string, mode?: string) => {
    if (token.trim() !== '' && target.trim() !== '') {
        const params: {[key: string]: string | boolean} = {
            chat_id : target,
            text: msg,
        }
        if (mode) {
            params.parse_mode = mode
            params.disable_web_page_preview = true
        }
        const body = formatBody(params)
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {method: 'POST', body, headers})
    }
}

export const notifySlack = async (msg: string, webhook: string, target: string, botname: string = "noti-bot", boticon: string = "slack") => {
    if (webhook.trim() !== '' && target.trim() !== '') {
        const params: {[key: string]: string} = {
            payload: JSON.stringify({
                "channel" : target,
                "username":  botname,
                "text": msg,
                "icon_emoji": boticon,
            })
        }
        const body = formatBody(params)
        await fetch(`${webhook}`, {method: 'POST', body, headers})
    }
}

export const notifyDiscord = async (msg: string, webhook: string) => {
    if (webhook.trim() !== '') {
        const params: {[key: string]: string} = {
            "content": msg,
        }
        const body = formatBody(params)
        await fetch(`${webhook}`, {method: 'POST', body, headers})
    }
}
