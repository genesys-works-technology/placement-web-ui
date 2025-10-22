import { http, HttpResponse } from 'msw'
import type { components } from '../types/api'

const students: components['schemas']['Student'][] = [
    // Example mock data
    {
        firstName: "John",
        lastName: "Doe",
        graduationYear: 2025,
        email: "john.doe@example.com",
        phone: "1234567890",
        homeAddress: "123 Main St",
        schoolAddress: "456 School Rd",
        schoolName: "Example School"
    }
]

const placements: components['schemas']['Placement'][] = [
    {
        id: "1",
        company: "Acme Corp",
        address: "789 Business Ave",
        remote: false,
        startDate: null,
        endDate: null,
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
]

type Student = components['schemas']['Student']
type Placement = components['schemas']['Placement']
type StudentListResponse = components['schemas']['StudentListResponse']
type PlacementListResponse = components['schemas']['PlacementListResponse']

export const handlers = [
    http.get('/students', ({ request }) => {
        const url = new URL(request.url)
        const limit: number = Number(url.searchParams.get('limit')) || 20
        const items: Student[] = students.slice(0, limit)
        const response: StudentListResponse = {
            items,
            nextCursor: null
        }
        return HttpResponse.json(response, { status: 200 })
    }),

    http.get('/students/:studentId', ({ params }) => {
        const student: Student | undefined = students.find(s => s.email === params.studentId)
        if (!student) {
            return HttpResponse.json({ error: 'Student not found' }, { status: 404 })
        }
        return HttpResponse.json(student, { status: 200 })
    }),

    http.get('/placements', ({ request }) => {
        const url = new URL(request.url)
        const limit: number = Number(url.searchParams.get('limit')) || 20
        const items: Placement[] = placements.slice(0, limit)
        const response: PlacementListResponse = {
            items,
            nextCursor: null
        }
        return HttpResponse.json(response, { status: 200 })
    }),

    http.get('/placements/:placementId', ({ params }) => {
        const placement: Placement | undefined = placements.find(p => p.id === params.placementId)
        if (!placement) {
            return HttpResponse.json({ error: 'Placement not found' }, { status: 404 })
        }
        return HttpResponse.json(placement, { status: 200 })
    })
]