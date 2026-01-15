# Deployment Guide - Find Your Light Psychiatry

This guide provides detailed instructions for deploying the Find Your Light Psychiatry website to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] All environment variables configured
- [ ] Resend API key and verified domain
- [ ] Contact email address configured
- [ ] Domain name purchased and DNS access
- [ ] SSL certificate (automatic with Vercel/Netlify)
- [ ] All tests passing (`npm run test` and `npm run test:e2e`)
- [ ] No linter errors (`npm run lint`)
- [ ] Production build successful (`npm run build`)

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and provides the best performance and developer experience.

#### Initial Setup

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add the following variables:

   ```
   RESEND_API_KEY=re_your_actual_api_key
   RESEND_FROM=Find Your Light Psychiatry <noreply@findyourlightpsychiatry.org>
   CONTACT_EMAIL=april@findyourlightpsychiatry.org
   NEXT_PUBLIC_BASE_URL=https://www.findyourlightpsychiatry.org
   NEXT_PUBLIC_PHONE_NUMBER=(425) 780-7460
   NEXT_PUBLIC_PHONE_LINK=tel:+14257807460
   NEXT_PUBLIC_CONTACT_EMAIL=contact@findyourlightpsychiatry.org
   NEXT_PUBLIC_LOCATION=Seattle, Washington
   NEXT_PUBLIC_PRICE_INITIAL=$325
   NEXT_PUBLIC_PRICE_FOLLOWUP=$175
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a preview URL (e.g., `your-project.vercel.app`)

#### Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add `findyourlightpsychiatry.org` and `www.findyourlightpsychiatry.org`

2. **Update DNS Records**
   - Point your domain to Vercel:
     - **A Record**: `76.76.21.21` (for apex domain)
     - **CNAME**: `cname.vercel-dns.com` (for www subdomain)
   - Or use Vercel nameservers for easier management

3. **SSL Certificate**
   - Vercel automatically provisions and renews SSL certificates
   - No action needed

4. **Update Environment Variables**
   - Update `NEXT_PUBLIC_BASE_URL` to your production domain
   - Redeploy for changes to take effect

#### Continuous Deployment

- **Automatic**: Every push to `main` branch triggers a production deployment
- **Preview**: Every pull request gets a unique preview URL
- **Rollback**: Easy rollback to previous deployments in Vercel dashboard

---

### Option 2: Netlify

Netlify is another excellent option with similar features to Vercel.

#### Initial Setup

1. **Create Netlify Account**
   - Go to [netlify.com](https://www.netlify.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

4. **Install Next.js Plugin**
   - Netlify will prompt to install the Essential Next.js plugin
   - Click "Install"

5. **Add Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all variables from the Vercel section above

6. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy

#### Custom Domain Setup

1. **Add Domain**
   - Go to Domain Settings → Add custom domain
   - Follow Netlify's DNS configuration instructions

2. **SSL Certificate**
   - Netlify automatically provisions Let's Encrypt SSL
   - Enable HTTPS in domain settings

---

### Option 3: Self-Hosted (VPS/Cloud)

For more control, you can self-host on any Node.js-compatible platform.

#### Requirements

- Node.js 20.x or higher
- PM2 or similar process manager
- Nginx or Apache as reverse proxy
- SSL certificate (Let's Encrypt recommended)

#### Deployment Steps

1. **Clone Repository on Server**
   ```bash
   git clone https://github.com/ShadyEe10/findyourlightpsychiatry.git
   cd findyourlightpsychiatry
   ```

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Create Environment File**
   ```bash
   nano .env.local
   # Add all environment variables
   ```

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "findyourlight" -- start
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name findyourlightpsychiatry.org www.findyourlightpsychiatry.org;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Setup SSL with Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d findyourlightpsychiatry.org -d www.findyourlightpsychiatry.org
   ```

---

## 📧 Email Configuration (Resend)

### Setup Resend

1. **Create Account**
   - Go to [resend.com](https://resend.com/)
   - Sign up for an account

2. **Verify Domain**
   - Go to Domains → Add Domain
   - Add `findyourlightpsychiatry.org`
   - Add DNS records provided by Resend:
     - **SPF Record** (TXT)
     - **DKIM Record** (TXT)
     - **DMARC Record** (TXT)

3. **Create API Key**
   - Go to API Keys → Create API Key
   - Copy the key (starts with `re_`)
   - Add to environment variables as `RESEND_API_KEY`

4. **Test Email**
   - Submit a test form on your site
   - Check that emails are received
   - Monitor Resend dashboard for delivery status

### Email Best Practices

- Use a subdomain for sending (e.g., `noreply@findyourlightpsychiatry.org`)
- Monitor bounce rates and spam reports in Resend dashboard
- Keep API key secure and never commit to version control
- Set up email forwarding for `contact@` and `noreply@` addresses

---

## 🔒 Security Considerations

### Environment Variables

- **Never commit** `.env.local` or `.env` files to version control
- Use platform-specific environment variable management
- Rotate API keys regularly
- Use different keys for development and production

### HIPAA Compliance

- Ensure all data transmission is over HTTPS
- Contact form data is encrypted in transit
- Email provider (Resend) is HIPAA-compliant
- Do not store patient information in the application
- Log only non-sensitive information

### Rate Limiting

- Contact form has built-in rate limiting (5 requests per 15 minutes per IP)
- Monitor for abuse in server logs
- Adjust rate limits in `lib/rateLimit.ts` if needed

### Security Headers

The application includes comprehensive security headers:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics**
   - Go to Project Settings → Analytics
   - Enable Web Analytics
   - Free tier includes basic metrics

2. **Monitor Performance**
   - Core Web Vitals
   - Page load times
   - Geographic distribution

### Google Analytics (Optional)

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com/)
   - Create new GA4 property

2. **Add Tracking Code**
   - Get Measurement ID (G-XXXXXXXXXX)
   - Add to environment variables: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Implement tracking in `app/layout.tsx`

### Error Monitoring (Optional)

Consider adding error monitoring with:
- **Sentry**: Real-time error tracking
- **LogRocket**: Session replay and debugging
- **Datadog**: Full-stack monitoring

---

## 🔄 Deployment Workflow

### Development → Staging → Production

1. **Development**
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   npm run dev
   npm run test
   npm run lint
   ```

2. **Create Pull Request**
   - Push to GitHub
   - Create PR to `main` branch
   - Vercel creates preview deployment
   - Review preview URL

3. **Merge to Production**
   - Merge PR to `main`
   - Automatic deployment to production
   - Monitor deployment in Vercel dashboard

### Rollback Procedure

If issues occur after deployment:

1. **Vercel**: Go to Deployments → Select previous deployment → Promote to Production
2. **Git**: Revert commit and push to trigger new deployment
3. **Emergency**: Use Vercel CLI to rollback instantly

---

## 📝 Post-Deployment Checklist

After deploying, verify:

- [ ] Site loads correctly at production URL
- [ ] All pages are accessible
- [ ] Contact form submits successfully
- [ ] Emails are received (both practice and confirmation)
- [ ] Images load properly
- [ ] Mobile responsiveness works
- [ ] SSL certificate is active (HTTPS)
- [ ] Sitemap is accessible (`/sitemap.xml`)
- [ ] Robots.txt is accessible (`/robots.txt`)
- [ ] Social media links work
- [ ] Google Search Console is configured
- [ ] Analytics tracking is working
- [ ] Performance metrics are good (Lighthouse)

---

## 🆘 Troubleshooting

### Build Failures

**Issue**: Build fails on deployment platform

**Solutions**:
- Check build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check for TypeScript errors: `npm run build` locally

### Email Not Sending

**Issue**: Contact form submits but no email received

**Solutions**:
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for delivery status
- Verify domain is verified in Resend
- Check DNS records (SPF, DKIM, DMARC)
- Review server logs for errors

### Environment Variables Not Working

**Issue**: Environment variables not loading

**Solutions**:
- Ensure variables are added in platform dashboard
- Redeploy after adding variables
- Check variable names match exactly
- Verify `NEXT_PUBLIC_` prefix for client-side variables

### Domain Not Resolving

**Issue**: Custom domain not working

**Solutions**:
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check domain registrar settings
- Use `dig` or `nslookup` to verify DNS

---

## 📞 Support

For deployment issues:

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Resend Support**: [resend.com/support](https://resend.com/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**Last Updated**: December 2024



