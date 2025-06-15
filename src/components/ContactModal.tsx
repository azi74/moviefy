
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail, MessageSquare } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactModal = ({ open, onOpenChange }: ContactModalProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", { email, message });
    // Handle form submission here
    onOpenChange(false);
    setEmail("");
    setMessage("");
  };

  const ContactForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-moviefy-gray-dark border-moviefy-gray-medium text-white placeholder:text-moviefy-gray-light"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-white">
          Your Message
        </label>
        <Textarea
          id="message"
          placeholder="How can we help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="bg-moviefy-gray-dark border-moviefy-gray-medium text-white placeholder:text-moviefy-gray-light resize-none"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-moviefy-yellow text-moviefy-black hover:bg-moviefy-yellow-light"
      >
        <Mail className="w-4 h-4 mr-2" />
        Send Message
      </Button>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-moviefy-gray-dark border-moviefy-gray-medium">
          <DrawerHeader className="text-center pb-2">
            <DrawerTitle className="text-white flex items-center justify-center gap-2">
              <MessageSquare className="w-5 h-5 text-moviefy-yellow" />
              Contact Us
            </DrawerTitle>
          </DrawerHeader>
          <ContactForm />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-moviefy-gray-dark border-moviefy-gray-medium max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-moviefy-yellow" />
            Contact Us
          </DialogTitle>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
