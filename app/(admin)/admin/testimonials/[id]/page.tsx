import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { TestimonialForm } from '@/app/components/admin/TestimonialForm'
import { notFound } from 'next/navigation'

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!testimonial) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Testimonial</h1>
      <TestimonialForm mode="edit" testimonial={testimonial} />
    </div>
  )
} 