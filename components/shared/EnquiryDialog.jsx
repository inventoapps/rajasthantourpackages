'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
import EnquiryForm from '@/components/EnquiryForm';

export default function EnquiryDialog({
  open,
  onOpenChange,
  packageId = null,
  packageTitle = null,
  title = 'Send an Enquiry',
  description = "Tell us what you need and we'll get back to you within 24 hours.",
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[calc(100%-1rem)] sm:w-full max-h-[88vh] overflow-y-auto p-4 pt-11 sm:p-6 sm:pt-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base sm:text-lg pr-9">{title}</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-stone-500 pr-2">{description}</DialogDescription>
        </DialogHeader>
        {packageId ? (
          <EnquiryForm packageId={packageId} packageTitle={packageTitle} />
        ) : (
          <EnquiryForm />
        )}
        <DialogFooter className="hidden sm:flex">
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
