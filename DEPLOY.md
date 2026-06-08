# How to Deploy to GitHub Pages

Follow these steps to publish the SGPA Calculator so anyone can use it via a link.

---

## Step 1 — Create a GitHub account (if you don't have one)

Go to https://github.com and sign up for free.

---

## Step 2 — Create a new repository

1. Click the **+** icon in the top-right corner → **New repository**
2. Repository name: `sgpa-calculator`
3. Set visibility to **Public**
4. Leave everything else unchecked
5. Click **Create repository**

---

## Step 3 — Upload your files

You'll see an empty repo page. Click **uploading an existing file**.

Upload all four files:
- `index.html`
- `style.css`
- `app.js`
- `README.md`

Click **Commit changes**.

---

## Step 4 — Enable GitHub Pages

1. In your repository, go to **Settings** (top tab)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main` → folder: `/ (root)` → click **Save**

---

## Step 5 — Get your link

After 1–2 minutes, GitHub will show your live URL:

```
https://<your-username>.github.io/sgpa-calculator
```

Share this link with your classmates — it works on any device, no install needed.

---

## Updating the calculator later

To make changes:
1. Edit the files locally
2. Go to your GitHub repo → click the file → click the pencil icon to edit
3. Or drag-and-drop new versions of the files to replace them

Changes go live within ~60 seconds.

---

## Using Git (optional — for developers)

If you have Git installed, you can also do:

```bash
cd sgpa-calculator
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/sgpa-calculator.git
git push -u origin main
```

Then enable Pages in Settings as described in Step 4.
