# FormulaGenie - AI-Powered Formula Generator

Transform plain English into perfect Excel formulas instantly. Built with React, TypeScript, and powered by OpenAI.

## 🚀 Features

- **English to Formula**: Convert natural language to Excel/Google Sheets formulas
- **Formula Explanation**: Understand complex formulas in simple terms
- **SQL Generator**: Create SQL queries from plain English
- **Regex Builder**: Generate regular expressions with explanations
- **Code Generation**: Python, JavaScript, and more
- **Error Detection**: Find and fix formula errors automatically
- **Usage Analytics**: Track your formula generation usage
- **Multiple Plans**: Free tier with 5 requests/day, unlimited paid plans

## 🛠 Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **AI**: OpenAI GPT models for formula generation
- **Payments**: Gumroad integration for subscriptions
- **Build Tool**: Vite

## 📊 Database Schema

- **profiles**: User profiles with plan information and usage tracking
- **requests**: Formula generation history and analytics
- **saved_formulas**: User's saved formulas library
- **formula_examples**: Pre-built examples and templates

The project requires these secrets to be configured in Supabase:
- `OPENAI_API_KEY`: For AI formula generation
- `SUPABASE_SERVICE_ROLE_KEY`: For database operations
- `SUPABASE_URL` and `SUPABASE_ANON_KEY`: For client connections

## 🚀 Quick Start

**Using Lovable (Recommended)**

Simply visit the [FormulaGenie Project](https://lovable.dev/projects/77e718a3-af1b-4ddc-aaa0-799b0000c512) and start prompting.

**Local Development**

```sh
# Clone and install
git clone <YOUR_GIT_URL>
cd formulagenie
npm install

# Start development server
npm run dev
```

## 📈 Usage Limits

- **Free Plan**: 5 requests per day
- **Pro Plan**: Unlimited requests ($9/month)
- **Team Plan**: Unlimited + collaboration ($29/month)  
- **Lifetime Deal**: Unlimited forever ($39 one-time)

## 🔐 Authentication & Security

- Row Level Security (RLS) enabled on all tables
- User authentication via Supabase Auth
- Plan expiration automated via cron jobs
- Usage tracking and daily limit resets

## 📱 Deployment

Deploy to production with one click using [Lovable](https://lovable.dev/projects/77e718a3-af1b-4ddc-aaa0-799b0000c512) → Share → Publish.

## 🌐 Custom Domain

Connect your own domain in Project → Settings → Domains. [Learn more](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 🤝 Contributing

FormulaGenie is built on Lovable. Make changes by prompting the AI or clone locally for traditional development.

---

**FormulaGenie** - Transform your spreadsheet workflow with AI-powered formula generation.
