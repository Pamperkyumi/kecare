import { createClient } from '@supabase/supabase-js'

let client: ReturnType<typeof createClient> | null = null

export function useSupabase() {
    if (client) return client

    const config = useRuntimeConfig()

    const supabaseUrl = config.public.supabaseUrl as string
    const supabaseKey = config.public.supabasePublishableKey as string

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase 配置缺失：请确保 .env 中设置了 SUPABASE_URL 和 SUPABASE_PUBLISHABLE_KEY')
    }

    client = createClient(supabaseUrl, supabaseKey)
    return client
}
