'use server';

import { InvoiceSchema } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CreateInvoiceSchema = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoiceSchema.parse(
    Object.fromEntries(formData.entries()),
  );

  console.log('Creating invoice', {
    customerId,
    amount,
    status,
  });

  const amountInCents = amount * 100;
  const currentDate = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${currentDate})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
