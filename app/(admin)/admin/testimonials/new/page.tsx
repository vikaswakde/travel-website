import { TestimonialForm } from '@/app/components/admin/TestimonialForm'

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Testimonial</h1>
      <TestimonialForm mode="create" />
    </div>
  )
} 