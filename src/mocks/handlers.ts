import { http, HttpResponse } from 'msw'
import type { components } from '../types/api'

// Update mock arrays to match new types from the latest api spec
const students: components['schemas']['Student'][] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    firstName: `Student${i + 1}`,
    lastName: `Last${i + 1}`,
    graduationYear: 2025 + (i % 3),
    email: `student${i + 1}@example.com`,
    phone: `12345678${i}`,
    homeAddress: `${100 + i} Main St`,
    highSchoolId: `HS${i + 1}`,
    schoolAddress: `${200 + i} School Rd`,
    schoolName: `School ${i + 1}`
}))

const workLocationTypes: Array<"onsite" | "remote" | "hybrid"> = ['onsite', 'remote', 'hybrid']

const positions: components['schemas']['Position'][] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    company: `Company ${i + 1}`,
    address: `${300 + i} Business Ave`,
    status: i % 2 === 0 ? "active" : "inactive",
    gwLocation: `GW Location ${i + 1}`,
    workLocation: workLocationTypes[Math.floor(Math.random() * workLocationTypes.length)],
    startDate: `2025-0${(i % 9) + 1}-01`,
    endDate: `2025-1${(i % 9) + 1}-01`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}))

type Student = components['schemas']['Student']
type Position = components['schemas']['Position']
type StudentListResponse = components['schemas']['StudentListResponse']
type PositionListResponse = components['schemas']['PositionListResponse']

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

    http.get('/positions', ({ request }) => {
        const url = new URL(request.url)
        const limit: number = Number(url.searchParams.get('limit')) || 20
        const items: Position[] = positions.slice(0, limit)
        const response: PositionListResponse = {
            items,
            nextCursor: null
        }
        return HttpResponse.json(response, { status: 200 })
    }),

    http.get('/positions/:positionId', ({ params }) => {
        const position: Position | undefined = positions.find(p => p.id === params.positionId)
        if (!position) {
            return HttpResponse.json({ error: 'Position not found' }, { status: 404 })
        }
        return HttpResponse.json(position, { status: 200 })
    })
]