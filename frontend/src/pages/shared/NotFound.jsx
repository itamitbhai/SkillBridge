import { useNavigate } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import Button from '../../components/ui/Button'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50">
        <Sprout size={26} className="text-navy-400" />
      </div>
      <h1 className="text-2xl font-bold text-navy-900">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-navy-500">The page you're looking for doesn't exist or may have been moved.</p>
      <Button className="mt-6" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  )
}
