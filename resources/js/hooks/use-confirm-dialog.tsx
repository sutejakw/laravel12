import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

type ConfirmDialogOptions = {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
};

export function useConfirmDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);

    const showDialog = (opts: ConfirmDialogOptions) => {
        setOptions(opts);
        setIsOpen(true);
    };

    const ConfirmDialog = () => {
        if (!options) return null; // Prevent rendering if no options

        return (
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{options.title}</AlertDialogTitle>
                        <AlertDialogDescription>{options.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{options.cancelText || 'Cancel'}</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                options.onConfirm();
                                setIsOpen(false);
                            }}
                        >
                            {options.confirmText || 'Confirm'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    return { showDialog, ConfirmDialog };
}
