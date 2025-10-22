import { http, HttpResponse } from 'msw'
import type { components } from '../types/api'

const students: components['schemas']['Student'][] = Array.from({ length: 10 }, (_, i) => ({
    firstName: `Student${i + 1}`,
    lastName: `Last${i + 1}`,
    graduationYear: 2025 + (i % 3),
    email: `student${i + 1}@example.com`,
    phone: `12345678${i}`,
    homeAddress: `${100 + i} Main St`,
    schoolAddress: `${200 + i} School Rd`,
    schoolName: `School ${i + 1}`
}))

const placements: components['schemas']['Placement'][] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    company: `Company ${i + 1}`,
    address: `${300 + i} Business Ave`,
    remote: i % 2 === 0,
    startDate: `2025-0${(i % 9) + 1}-01`,
    endDate: `2025-1${(i % 9) + 1}-01`,
    status: i % 2 === 0 ? "active" : "inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}))

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