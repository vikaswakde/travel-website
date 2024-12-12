import { DestinationForm } from '@/app/components/admin/DestinationForm'

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Destination</h1>
      <DestinationForm mode="create" />
    </div>
  )
} 