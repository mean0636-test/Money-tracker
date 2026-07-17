# ប្តូរទៅ Supabase — ចូលគណនីលឿន (<១ វិនាទី)

Supabase ជា server ពិត (ឥតគិតថ្លៃ) ជំនួស Google Apps Script។ ក្រោយរៀបចំរួច ការចូលគណនី និងការរក្សាទុកទិន្នន័យ នឹងលឿនជាងមុន **១០-២០ ដង**។

## ជំហានទី ១ — បង្កើតគម្រោង Supabase (~៥ នាទី)
1. ចូល **https://supabase.com** → **Start your project** → Sign in ជាមួយ GitHub (គណនីដែលអ្នកមានស្រាប់)
2. **New project**៖
   - Name: `money-note`
   - Database Password: បង្កើតពាក្យសម្ងាត់ខ្លាំង (កត់ទុក — ប៉ុន្តែកម្មវិធីមិនត្រូវការវាទេ)
   - Region: **Southeast Asia (Singapore)** ← ជិតកម្ពុជាបំផុត លឿនបំផុត
3. ចុច **Create new project** → រង់ចាំ ~២ នាទី

## ជំហានទី ២ — បង្កើតតារាងទិន្នន័យ
1. ម៉ឺនុយឆ្វេង → **SQL Editor** → **New query**
2. បើកឯកសារ `supabase-setup.sql` → ចម្លងទាំងអស់ → បិទភ្ជាប់ → ចុច **Run**
3. ឃើញ "Success. No rows returned" = រួចរាល់ ✅

## ជំហានទី ៣ — កំណត់ការចូលគណនី
1. ម៉ឺនុយឆ្វេង → **Authentication** → **Sign In / Providers** (ឬ Providers)
2. ត្រង់ **Email** → បើកស្រាប់ ✅ — ប៉ុន្តែសូម**បិទ "Confirm email"** ដើម្បីឱ្យចុះឈ្មោះចូលបានភ្លាមដោយមិនរង់ចាំអ៊ីមែល (បើទុកបើក ក៏បានដែរ — អ្នកប្រើត្រូវចុចតំណបញ្ជាក់ក្នុងអ៊ីមែលសិន)
3. ចុច **Save**

### (ជម្រើស) បើកចូលដោយ Google
1. ក្នុង Providers → **Google** → Enable
2. យក **Client ID** និង **Client Secret** ពី Google Cloud Console (គម្រោង Money-Note ដែលអ្នកបង្កើតរួច — Credentials → OAuth client របស់អ្នក)
3. ចម្លង **Callback URL** ដែល Supabase បង្ហាញ (រាង `https://xxxx.supabase.co/auth/v1/callback`) → ទៅ Google Cloud Console → OAuth client → **Authorized redirect URIs** → Add → បិទភ្ជាប់ → Save
4. ត្រឡប់មក Supabase → Save
5. **Authentication → URL Configuration** → **Site URL**៖ `https://mean0636-test.github.io/Money-Note/` → Save (សំខាន់ — បើអត់ ការចូល Google និងតំណភ្លេចពាក្យសម្ងាត់ នឹងបញ្ជូនទៅខុសកន្លែង)

## ជំហានទី ៤ — ដាក់កូនសោក្នុងកម្មវិធី
1. Supabase ម៉ឺនុយឆ្វេង → ⚙️ **Project Settings** → **API** (ឬ Data API)
2. ចម្លង ២ តម្លៃ៖
   - **Project URL** (រាង `https://xxxx.supabase.co`)
   - **anon / public key** (អក្សរវែង — សុវត្ថិភាពដាក់ក្នុងកូដបាន ព្រោះមាន Row Level Security ការពារ)
3. បើក `index.html` → រកបន្ទាត់ (ជិតដើមកូដ script)៖
```
const SUPABASE_URL='PASTE_YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY='PASTE_YOUR_ANON_KEY_HERE';
```
→ ជំនួសអត្ថបទក្នុងសញ្ញា `'...'` ដោយតម្លៃរបស់អ្នក (**ទុកសញ្ញា ' នៅដដែល!**)

## ជំហានទី ៥ — Upload
Upload `index.html` + `sw.js` ថ្មី ជំនួសក្នុង GitHub repository → រង់ចាំ ១-២ នាទី → បើកកម្មវិធី។

## ជំហានទី ៦ — ផ្លាស់ទិន្នន័យចាស់ពី Google Sheets (បើមាន)
1. បើកកម្មវិធី**កំណែចាស់** (ឬចូល Google Sheet ផ្ទាល់)... វិធីងាយបំផុត៖ មុន upload កំណែថ្មី បើកកម្មវិធីចាស់ → ចូលគណនី → **ផ្សេងៗ → 🗄️ បម្រុងទុកទាំងអស់ (JSON)** → រក្សាឯកសារ
2. Upload កំណែថ្មី → បើកកម្មវិធី → **ចុះឈ្មោះគណនីថ្មី** (អ៊ីមែលដដែលក៏បាន)
3. **ផ្សេងៗ → 📥 ស្តារទិន្នន័យ (Restore)** → ជ្រើសឯកសារ JSON នោះ → ទិន្នន័យទាំងអស់ចូល Supabase ✅

## ចំណាំ
- Google Apps Script និង Google Sheet ចាស់ លែងត្រូវការទៀតហើយ (កុំទាន់លុប រហូតដល់ប្រាកដថាទិន្នន័យផ្លាស់រួច)
- ថវិកា (Budget) និងប្រតិបត្តិការដដែលៗ នៅដំណើរការដដែល
- ភ្លេចពាក្យសម្ងាត់៖ ឥឡូវផ្ញើជា**តំណ**ទៅអ៊ីមែល (មិនមែនលេខកូដ ៦ ខ្ទង់ទៀតទេ) — ចុចតំណ → ត្រឡប់មកកម្មវិធី → កំណត់ពាក្យសម្ងាត់ថ្មី
- Supabase ឥតគិតថ្លៃ៖ 500MB database + 50,000 អ្នកប្រើ/ខែ — លើសពីគ្រប់គ្រាន់
