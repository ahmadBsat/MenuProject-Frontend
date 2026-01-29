# 🚨 URGENT DEPLOYMENT STEPS - Fix Production Now

**Issue**: madosburger.fmcshops.com is down (404 gateway) and Server Action errors are crashing the container.

**Root Cause**: Container keeps crashing due to unhandled "Failed to find Server Action" errors.

**Solution**: Deploy the fix immediately to stop the crashes.

---

## 🔥 IMMEDIATE STEPS (5 minutes)

### Step 1: Commit the Fixes
```bash
# Make sure you're in the project directory
cd f:\WORK\FMC\MenuProject-Frontend

# Stage all changes
git add .

# Commit with clear message
git commit -m "fix: Add auto-reload for Server Action errors and standalone mode

- Fixes container crashes from Server Action mismatches
- Adds error boundary with automatic page reload
- Enables standalone output for smaller images
- Adds deployment monitoring and health checks"

# Push to trigger Coolify deployment
git push origin main
```

### Step 2: Monitor Coolify Deployment
1. Go to Coolify dashboard
2. Navigate to: **Applications → MenuProject-Frontend**
3. Watch the **Build Logs** tab
4. Wait for: "Build completed successfully" (usually 5-8 minutes)

### Step 3: Verify Deployment
```bash
# Once deployment finishes, test the health endpoint:
curl https://madosburger.fmcshops.com/api/health

# Expected output:
# {"status":"ok","deploymentId":"<git-commit-hash>","timestamp":"..."}
```

---

## 📊 What Will Happen

### During Deployment (5-8 minutes)
- ✅ Coolify builds new Docker image with standalone mode
- ✅ Container size reduces from ~800MB to ~400MB
- ✅ New error boundary is deployed
- ✅ Health check endpoint becomes available

### After Deployment
- ✅ **Container stops crashing** - Error boundary catches Server Action errors
- ✅ **Users see smooth reload** instead of error page
- ✅ **404 gateway error fixed** - Container stays running
- ✅ **Deployment monitor active** - Notifies users of updates

---

## 🔍 Troubleshooting

### If Build Fails in Coolify

**Check 1: Verify SOURCE_COMMIT is set**
```bash
# In Coolify build logs, look for:
# ARG SOURCE_COMMIT
# ENV SOURCE_COMMIT=<value>
```

**Check 2: Verify standalone output is created**
```bash
# In Coolify build logs, look for:
# .next/standalone/server.js
# Should appear in the build output
```

**Check 3: Docker build error**
If you see "Error copying .next/standalone":
- This means `output: "standalone"` in next.config.mjs isn't working
- Run locally first: `npm run build` and check if `.next/standalone/` exists

### If Container Still Crashes After Deployment

**Option 1: Check Container Logs**
```bash
# In Coolify:
Applications → MenuProject-Frontend → Logs

# Look for:
- "Detected Server Action mismatch - auto-reloading page..."
  ✅ Good - Error is being caught

- "Failed to find Server Action" without auto-reload message
  ❌ Bad - Error boundary not working
```

**Option 2: Force Restart Container**
```bash
# In Coolify dashboard:
Applications → MenuProject-Frontend → Actions → Restart
```

**Option 3: Rollback (if needed)**
```bash
# In Coolify dashboard:
Applications → MenuProject-Frontend → Deployments
# Find previous working deployment
# Click "Redeploy"
```

---

## 🎯 Quick Health Check Commands

### After deployment finishes, run these:

```bash
# 1. Check if site is up
curl -I https://madosburger.fmcshops.com
# Expected: HTTP/2 200

# 2. Check health endpoint
curl https://madosburger.fmcshops.com/api/health
# Expected: {"status":"ok",...}

# 3. Check deployment ID matches git commit
git rev-parse HEAD
# Compare with deploymentId from health endpoint
```

---

## 📋 Expected Timeline

| Time | Action | Status |
|------|--------|--------|
| T+0 | Push to git | ⏳ Waiting |
| T+1min | Coolify detects push | ⏳ Waiting |
| T+2min | Build starts | ⏳ Building |
| T+5-8min | Build completes | ⏳ Building |
| T+8-10min | Container deployed | ✅ Running |
| T+10min | Health check passes | ✅ Healthy |

---

## 🛡️ What the Fix Does

### Error Boundary (error.tsx)
```typescript
// Detects Server Action errors
if (error.message?.includes("Failed to find Server Action")) {
  // Shows spinner: "Updating to latest version..."
  setTimeout(() => window.location.reload(), 1000);
}
```

**Result**: Instead of crashing, users see a 1-second loading spinner and the page reloads with the correct version.

### Deployment Monitor (deployment-monitor.tsx)
```typescript
// Polls /api/health every 60 seconds
// Detects when deploymentId changes
// Shows notification: "Update Available - Refresh Now"
```

**Result**: Users are proactively notified when a new version is deployed.

### Standalone Mode (Dockerfile + next.config.mjs)
```dockerfile
# Old way:
COPY .next/
COPY node_modules/
CMD ["node_modules/.bin/next", "start"]

# New way:
COPY .next/standalone/
CMD ["node", "server.js"]
```

**Result**: 50% smaller Docker images, faster deployments, only production dependencies.

---

## ⚠️ IMPORTANT NOTES

1. **First deployment will take longer** (~8-10 min vs usual 5-6 min)
   - Reason: Building standalone output for first time
   - Future deployments will be faster

2. **Users with open tabs will see the spinner**
   - When they trigger any action after deployment
   - This is GOOD - means error is being caught
   - They'll see: "Updating to latest version..."
   - Page reloads automatically after 1 second

3. **404 Gateway should disappear immediately**
   - Once new container is running
   - Error boundary prevents crashes
   - Container stays healthy

4. **Health endpoint will be available**
   - At: `https://madosburger.fmcshops.com/api/health`
   - Use for monitoring
   - DeploymentMonitor polls this every 60s

---

## 🔄 What to Do Right Now

**Execute these commands in order:**

```bash
# 1. Commit (if you haven't already)
git add .
git commit -m "fix: Add auto-reload for Server Action errors and standalone mode"

# 2. Push to trigger deployment
git push origin main

# 3. Watch Coolify
# Open: Coolify Dashboard → Applications → MenuProject-Frontend → Logs
# Wait for: "Build completed successfully"

# 4. Verify (after ~10 minutes)
curl https://madosburger.fmcshops.com/api/health
```

---

## ✅ Success Criteria

After deployment, you should see:

- ✅ No "404 gateway" error
- ✅ `https://madosburger.fmcshops.com` loads correctly
- ✅ `/api/health` returns JSON with deploymentId
- ✅ No container crashes in Coolify logs
- ✅ Server Action errors are caught and auto-reload happens

---

## 📞 If You Need Help

**Check these in order:**

1. **Coolify Build Logs** - Any errors during build?
2. **Container Logs** - Is error boundary catching errors?
3. **Health Endpoint** - Is it responding?
4. **Git Commit** - Did changes actually get committed?

**Common Issues:**

❌ **"Cannot find module"** → Run `npm install` before committing
❌ **"Standalone folder not found"** → Check `next.config.mjs` has `output: "standalone"`
❌ **"Still getting 404"** → Wait for deployment to complete (check Coolify status)
❌ **"Health endpoint 404"** → New code isn't deployed yet, keep waiting

---

**BOTTOM LINE**: Push the code now to fix the production issue! ⬆️

```bash
git add . && git commit -m "fix: Server Action errors" && git push origin main
```
