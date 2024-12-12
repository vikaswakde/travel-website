'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function DeleteDestination({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this destination?')) {
      return
    }

    setIsDeleting(true)
    try {
      await supabase.from('destinations').delete().eq('id', id)
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 disabled:opacity-50"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  )
} 