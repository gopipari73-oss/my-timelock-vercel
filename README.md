# 🔐 TimeLock — Apna Self-Hosted Secret Locker

## Kya hai yeh?
Ek personal timelock encryption app — apna password ek time-locked safe mein rakh do.
Server-side time check hota hai, toh **koi bypass nahi ho sakta**.

---

## 🚀 Deploy Kaise Karein (Step by Step)

### Step 1 — GitHub pe Upload Karo

1. **GitHub account banao**: https://github.com
2. **New Repository** banao — naam dil `timelock-app`
3. Saari files upload karo (ya GitHub Desktop use karo)

### Step 2 — Netlify pe Deploy Karo (FREE)

1. **Netlify account banao**: https://netlify.com
2. **"Add new site"** → **"Import from Git"** → GitHub select karo
3. Apna `timelock-app` repository select karo
4. Build settings auto-detect ho jaayenge (`netlify.toml` se)
5. **"Deploy site"** click karo

**Bas! 2-3 minute mein teri site live ho jaayegi.**
URL milega jaise: `https://your-random-name.netlify.app`

---

## ✅ Features

- 🔒 **Server-side time lock** — client side se bypass impossible
- 🔐 **Double encryption** — client-side AES + server storage
- 📱 **Mobile friendly** — phone pe bhi kaam karta hai
- 🆓 **100% free** — Netlify free tier kaafi hai personal use ke liye
- 💾 **Netlify Blobs** — persistent storage, data 1 saal tak safe

---

## ⚠️ Important Warnings

1. **ID save karo** — Lock ke baad jo ID mile, usse screenshot le lo ya kahin note karo
2. **URL yaad rakho** — Apni Netlify site ka URL save karo
3. **Internet chahiye** — Decrypt karne ke liye internet connection zaroori hai

---

## 🛡️ Security

- Password sirf server pe store hota hai (encrypted)
- Time check **server pe hota hai** — system clock change karne se bypass nahi hoga
- Netlify ka infrastructure use hota hai (99.9% uptime)
- Teri personal site hai — koi aur access nahi kar sakta

---

## Files Structure

```
timelock-app/
├── public/
│   └── index.html          ← Frontend (beautiful UI)
├── netlify/
│   └── functions/
│       ├── lock.js         ← Password store karta hai
│       └── unlock.js       ← Time check + return karta hai
├── netlify.toml            ← Netlify config
└── package.json            ← Dependencies
```
