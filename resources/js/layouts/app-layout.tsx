import ConfirmationDialog from '@/components/custom/confirmation-dialog';
import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const sharedProps = usePage().props as { flash?: { success?: string; error?: string } };
    useEffect(() => {
        if (sharedProps?.flash?.success) {
            toast.success(sharedProps.flash.success, {
                position: 'top-right',
            });
        }

        if (sharedProps?.flash?.error) {
            toast.error(sharedProps.flash.error, {
                position: 'top-right',
                duration: Infinity,
                closeButton: true,
            });
        }
    }, [sharedProps.flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster />

            {children}
            <ConfirmationDialog />
        </AppLayoutTemplate>
    );
};
