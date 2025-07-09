// Test Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bdwjormriqwhkbsdauau.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkd2pvcm1yaXF3aGtic2RhdWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NjcxNTEsImV4cCI6MjA2NzU0MzE1MX0.02z-Ftin7Uf_0-W9YdS-Iy5nQUEdDyAx7kK_3o-3m9A'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSupabase() {
  console.log('Testing Supabase connection...')
  
  try {
    // Test basic connection
    const { data, error } = await supabase
      .from('sticky_notes')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Error fetching data:', error)
    } else {
      console.log('Connection successful. Sample data:', data)
    }

    // Test insert
    const { data: insertData, error: insertError } = await supabase
      .from('sticky_notes')
      .insert([{
        title: 'Test Note',
        content: 'This is a test',
        x: 100,
        y: 100
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error inserting data:', insertError)
    } else {
      console.log('Insert successful:', insertData)
    }

  } catch (err) {
    console.error('Connection failed:', err)
  }
}

testSupabase() 